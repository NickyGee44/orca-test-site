/**
 * Netlify Function to extract article image from source URL
 * Route: GET /api/extractArticleImage?url=<article-url>
 *
 * Extracts Open Graph image (og:image) or other meta tags from article pages
 * to use as thumbnails for news articles.
 */

function json(statusCode, body, extraHeaders) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600", // Cache for 1 hour
      "access-control-allow-origin": "*",
      ...(extraHeaders || {})
    },
    body: JSON.stringify(body)
  };
}

/**
 * Extract image URL from HTML content
 * Priority: og:image > twitter:image > first large img tag > meta property="image"
 */
function extractImageFromHtml(html, baseUrl) {
  if (!html || typeof html !== "string") return null;

  // Try Open Graph image first (most reliable)
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogImageMatch && ogImageMatch[1]) {
    return resolveUrl(ogImageMatch[1], baseUrl);
  }

  // Try Twitter Card image
  const twitterImageMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
  if (twitterImageMatch && twitterImageMatch[1]) {
    return resolveUrl(twitterImageMatch[1], baseUrl);
  }

  // Try meta property="image"
  const metaImageMatch = html.match(/<meta\s+property=["']image["']\s+content=["']([^"']+)["']/i);
  if (metaImageMatch && metaImageMatch[1]) {
    return resolveUrl(metaImageMatch[1], baseUrl);
  }

  // Try to find first large image in article content
  const imgMatches = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  if (imgMatches && imgMatches.length > 0) {
    // Filter out small icons, logos, and common non-article images
    for (const imgTag of imgMatches) {
      const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
      if (srcMatch && srcMatch[1]) {
        const src = srcMatch[1].toLowerCase();
        // Skip common non-article images
        if (
          !src.includes("logo") &&
          !src.includes("icon") &&
          !src.includes("avatar") &&
          !src.includes("favicon") &&
          !src.includes("button") &&
          !src.includes("badge")
        ) {
          // Check if image seems large enough (has width/height attributes or looks like a photo)
          const widthMatch = imgTag.match(/width=["']?(\d+)["']?/i);
          const heightMatch = imgTag.match(/height=["']?(\d+)["']?/i);
          if (widthMatch && parseInt(widthMatch[1]) > 200) {
            return resolveUrl(srcMatch[1], baseUrl);
          }
          // If no size info, check if URL suggests it's a photo (common patterns)
          if (src.includes("photo") || src.includes("image") || src.includes("img") || src.match(/\d{4,}/)) {
            return resolveUrl(srcMatch[1], baseUrl);
          }
        }
      }
    }
    // Fallback: use first image if we found any
    const firstImgMatch = imgMatches[0].match(/src=["']([^"']+)["']/i);
    if (firstImgMatch && firstImgMatch[1]) {
      return resolveUrl(firstImgMatch[1], baseUrl);
    }
  }

  return null;
}

/**
 * Resolve relative URLs to absolute URLs
 */
function resolveUrl(url, baseUrl) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (!baseUrl) return url;
  try {
    const base = new URL(baseUrl);
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}

exports.handler = async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, OPTIONS",
        "access-control-allow-headers": "content-type"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "GET") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  const url = event.queryStringParameters?.url;
  if (!url) {
    return json(400, { ok: false, error: "missing_url_parameter" });
  }

  // Validate URL
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return json(400, { ok: false, error: "invalid_url_protocol" });
    }
  } catch {
    return json(400, { ok: false, error: "invalid_url" });
  }

  try {
    // Fetch the article page
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OrcaBot/1.0; +https://orcaaudit.com)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      },
      redirect: "follow",
      // Timeout after 10 seconds
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      return json(response.status >= 500 ? 502 : 404, {
        ok: false,
        error: "failed_to_fetch",
        status: response.status
      });
    }

    const html = await response.text();
    const imageUrl = extractImageFromHtml(html, url);

    if (!imageUrl) {
      return json(404, { ok: false, error: "no_image_found" });
    }

    return json(200, { ok: true, imageUrl });
  } catch (error) {
    // Handle timeout and network errors
    if (error.name === "AbortError" || error.name === "TimeoutError") {
      return json(504, { ok: false, error: "timeout" });
    }
    if (error.message && error.message.includes("fetch")) {
      return json(502, { ok: false, error: "network_error" });
    }
    return json(500, { ok: false, error: "server_error", message: error.message });
  }
};
