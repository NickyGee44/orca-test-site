/**
 * Netlify Function to fetch full article content from external URLs
 * Route: GET /api/fetchArticleContent?url=<article-url>
 *
 * Extracts the main article content from external pages, cleaning it up
 * and returning it in a format suitable for display on the Orca site.
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
 * Extract main article content from HTML
 * Tries to find the main article element or content area
 */
function extractArticleContent(html, baseUrl) {
  if (!html || typeof html !== "string") return null;

  // Common article content selectors (we'll use regex since we can't use DOM)
  // Try to find article, main, or content sections
  const articlePatterns = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*class=["'][^"']*article[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class=["'][^"']*post[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id=["'][^"']*article[^"']*["'][^>]*>([\s\S]*?)<\/div>/i
  ];

  let content = null;
  for (const pattern of articlePatterns) {
    const match = html.match(pattern);
    if (match && match[1] && match[1].length > 200) {
      // Found substantial content
      content = match[1];
      break;
    }
  }

  // If no specific article element found, try to extract between common markers
  if (!content) {
    // Look for content between header and footer
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) {
      // Remove common non-content elements
      content = bodyMatch[1]
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
        .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
        .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
        .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, "");
    }
  }

  if (!content) return null;

  // Clean up the content
  // Remove unwanted elements
  content = content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "");

  // Resolve relative URLs to absolute
  content = resolveUrls(content, baseUrl);

  return content;
}

/**
 * Resolve relative URLs in HTML content to absolute URLs
 */
function resolveUrls(html, baseUrl) {
  if (!baseUrl) return html;

  try {
    const base = new URL(baseUrl);

    // Resolve img src
    html = html.replace(/<img([^>]+)src=["']([^"']+)["']/gi, (match, attrs, src) => {
      if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//")) {
        return match;
      }
      try {
        const absoluteUrl = new URL(src, base).toString();
        return `<img${attrs}src="${absoluteUrl}"`;
      } catch {
        return match;
      }
    });

    // Resolve a href (but keep them as-is, we'll handle links separately)
    // Resolve other relative URLs in attributes
    html = html.replace(/(href|src|data-src)=["']([^"']+)["']/gi, (match, attr, url) => {
      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//") || url.startsWith("#") || url.startsWith("mailto:") || url.startsWith("tel:")) {
        return match;
      }
      try {
        const absoluteUrl = new URL(url, base).toString();
        return `${attr}="${absoluteUrl}"`;
      } catch {
        return match;
      }
    });
  } catch {
    // If URL parsing fails, return as-is
  }

  return html;
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
      // Timeout after 15 seconds
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      return json(response.status >= 500 ? 502 : 404, {
        ok: false,
        error: "failed_to_fetch",
        status: response.status
      });
    }

    const html = await response.text();
    const content = extractArticleContent(html, url);

    if (!content) {
      return json(404, { ok: false, error: "no_content_found" });
    }

    return json(200, { ok: true, content });
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
