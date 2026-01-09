/**
 * Article service for fetching and managing external and AI-generated articles
 */

export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string; // Full-length article content (HTML or markdown)
  source: string;
  url?: string;
  date: string;
  category: "external" | "ai-generated";
  author?: string;
  imageUrl?: string;
  sources?: Array<{ title: string; url: string }>; // Citations and references
}

const CACHE_KEY = "orca_articles";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Strip HTML tags and extract plain text from HTML content
 */
function stripHtml(html: string): string {
  if (!html) return "";
  
  // Use regex fallback first (works in all environments)
  let text = html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/&#x27;/g, "'") // Replace &#x27; with '
    .replace(/&#x2F;/g, "/") // Replace &#x2F; with /
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
  
  // If we're in a browser environment, try DOM parsing for better accuracy
  if (typeof document !== "undefined") {
    try {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      const domText = tmp.textContent || tmp.innerText || "";
      if (domText.trim()) {
        text = domText.replace(/\s+/g, " ").trim();
      }
    } catch (e) {
      // Fall back to regex result if DOM parsing fails
    }
  }
  
  return text;
}

/**
 * Extract image URL from HTML content or description
 * Enhanced to find more image sources
 */
function extractImageUrl(item: any): string | undefined {
  // Try to get image from enclosure
  if (item.enclosure?.link) {
    const enclosureUrl = item.enclosure.link;
    // Check if it's actually an image (common image extensions)
    if (/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(enclosureUrl)) {
      return enclosureUrl;
    }
  }

  // Try to extract from description HTML - look for multiple patterns
  if (item.description) {
    // Try Open Graph image first
    const ogMatch = item.description.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    if (ogMatch && ogMatch[1]) {
      return ogMatch[1];
    }
    
    // Try Twitter Card image
    const twitterMatch = item.description.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (twitterMatch && twitterMatch[1]) {
      return twitterMatch[1];
    }
    
    // Try img tags - get the first substantial image
    const imgMatches = item.description.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
    if (imgMatches && imgMatches.length > 0) {
      for (const imgTag of imgMatches) {
        const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
        if (srcMatch && srcMatch[1]) {
          const src = srcMatch[1];
          // Skip small icons, logos, and common non-article images
          if (
            !src.includes("logo") &&
            !src.includes("icon") &&
            !src.includes("avatar") &&
            !src.includes("favicon") &&
            !src.includes("button") &&
            !src.includes("badge") &&
            !src.includes("spacer") &&
            src.length > 10 // Basic sanity check
          ) {
            return src;
          }
        }
      }
      // Fallback: use first image if we found any
      const firstMatch = imgMatches[0].match(/src=["']([^"']+)["']/i);
      if (firstMatch && firstMatch[1]) {
        return firstMatch[1];
      }
    }
  }

  // Try contentSnippet or content
  if (item.content) {
    const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // Try media:content (common in RSS feeds)
  if (item["media:content"]?.url) {
    return item["media:content"].url;
  }

  return undefined;
}

/**
 * Fetch article image from source URL using the Netlify function
 * Falls back gracefully if the function fails or no image is found
 */
async function fetchArticleImageFromUrl(articleUrl: string): Promise<string | undefined> {
  if (!articleUrl) return undefined;

  try {
    // Use the Netlify function to extract image from article URL
    const apiUrl = `/api/extractArticleImage?url=${encodeURIComponent(articleUrl)}`;
    console.log(`[Image Extraction] Attempting to fetch image from: ${articleUrl}`);
    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      console.warn(`[Image Extraction] Failed for ${articleUrl}: HTTP ${response.status} - ${response.statusText}`);
      // If it's a 404, the function might not be deployed yet
      if (response.status === 404) {
        console.warn(`[Image Extraction] Netlify function not found. Make sure functions are deployed or run 'netlify dev' for local development.`);
      }
      return undefined;
    }

    const data = await response.json();
    if (data.ok && data.imageUrl) {
      console.log(`[Image Extraction] ✓ Successfully extracted image from ${articleUrl}: ${data.imageUrl}`);
      return data.imageUrl;
    } else {
      console.log(`[Image Extraction] No image found for ${articleUrl}`, data);
    }
  } catch (error) {
    console.error("[Image Extraction] Error fetching article image:", error);
    // Check if it's a network error (function not available)
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      console.warn(`[Image Extraction] Network error - Netlify functions may not be available. Deploy to Netlify or run 'netlify dev' for local development.`);
    }
  }

  return undefined;
}

/**
 * Fetch full article content from source URL using the Netlify function
 */
export async function fetchArticleContentFromUrl(articleUrl: string): Promise<string | null> {
  if (!articleUrl) return null;

  try {
    const apiUrl = `/api/fetchArticleContent?url=${encodeURIComponent(articleUrl)}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      console.debug(`Content extraction failed for ${articleUrl}: HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data.ok && data.content) {
      return data.content;
    }
  } catch (error) {
    console.debug("Failed to fetch article content:", error);
  }

  return null;
}

/**
 * Check if an article is relevant (Orca-related or general freight/logistics industry)
 */
function isRelevantArticle(article: { title: string; description: string; source: string }): boolean {
  const text = `${article.title} ${article.description} ${article.source}`.toLowerCase();
  
  // Orca-specific keywords
  const orcaKeywords = [
    'orca',
    'orcaaudit',
    'matt grossi',
    'marco grossi',
    'orca intelligence',
    'orca freight'
  ];
  
  // General freight/logistics industry keywords
  const industryKeywords = [
    'freight audit',
    'freight payment',
    'supply chain',
    'logistics',
    'shipping',
    'carrier',
    'transportation',
    'freight management',
    'freight invoice',
    'freight claims',
    'ltl',
    'ftl',
    'parcel',
    'logistics analytics',
    'supply chain analytics',
    'freight analytics',
    'transportation management',
    'tms',
    'warehouse',
    'distribution'
  ];
  
  // Check for Orca-specific mentions
  const isOrcaRelated = orcaKeywords.some(keyword => text.includes(keyword));
  
  // Check for industry relevance (must have at least 2 industry keywords to avoid false positives)
  const industryMatches = industryKeywords.filter(keyword => text.includes(keyword)).length;
  const isIndustryRelevant = industryMatches >= 2;
  
  return isOrcaRelated || isIndustryRelevant;
}

/**
 * Fetch external articles from RSS feeds using RSS2JSON proxy
 * Enhanced with multiple RSS sources and image extraction
 */
export async function fetchExternalArticles(): Promise<Article[]> {
  try {
    // Multiple RSS sources
    const rssSources = [
      {
        name: "Google News - Orca",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent("orca+freight+audit")}&hl=en-US&gl=US&ceid=US:en`
      },
      {
        name: "Google News - OrcaAudit",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent("orcaaudit.com")}&hl=en-US&gl=US&ceid=US:en`
      },
      {
        name: "Google News - Founders",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent('"Matt+Grossi"+OR+"Marco+Grossi"')}&hl=en-US&gl=US&ceid=US:en`
      },
      {
        name: "Google News - Freight Audit",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent("freight+audit+AI")}&hl=en-US&gl=US&ceid=US:en`
      },
      {
        name: "Google News - Supply Chain Analytics",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent("supply+chain+analytics+freight")}&hl=en-US&gl=US&ceid=US:en`
      }
    ];

    const articles: Article[] = [];

    for (const source of rssSources) {
      try {
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) continue;

        const data = await response.json();
        if (data.items && Array.isArray(data.items)) {
          const formattedArticles: Article[] = await Promise.all(
            data.items
              .slice(0, 10) // Get more articles to filter from
              .map(async (item: any, index: number) => {
                let imageUrl = extractImageUrl(item);
                const rawDescription = item.description || item.content || item.contentSnippet || "";
                const articleUrl = item.link;

                // If no image found in RSS feed, try to fetch from article URL
                if (!imageUrl && articleUrl) {
                  imageUrl = await fetchArticleImageFromUrl(articleUrl);
                }

                return {
                  id: `external-${source.name.replace(/\s+/g, "-")}-${index}-${Date.now()}`,
                  title: item.title || "Untitled",
                  description: stripHtml(rawDescription),
                  source: source.name,
                  url: articleUrl,
                  date: item.pubDate || new Date().toISOString(),
                  category: "external" as const,
                  author: item.author || "External Source",
                  imageUrl: imageUrl
                };
              })
          );

          const relevantArticles = formattedArticles
            .filter(article => isRelevantArticle(article))
            .slice(0, 4); // Limit to 4 relevant articles per source

          articles.push(...relevantArticles);
        }
      } catch (error) {
        console.warn(`Failed to fetch articles from "${source.name}":`, error);
      }
    }

    // Deduplicate by title
    const uniqueArticles = Array.from(
      new Map(articles.map((article) => [article.title, article])).values()
    );

    return uniqueArticles.slice(0, 20); // Increased limit to 20
  } catch (error) {
    console.error("Error fetching external articles:", error);
    return [];
  }
}

/**
 * Get cached articles or fetch new ones
 */
export async function getArticles(): Promise<Article[]> {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { articles, timestamp } = JSON.parse(cached);
      const now = Date.now();
      if (now - timestamp < CACHE_EXPIRY) {
        return articles;
      }
    } catch (error) {
      console.warn("Failed to parse cached articles:", error);
    }
  }

  const externalArticles = await fetchExternalArticles();
  const aiArticles = getAIArticles();

  // For articles without images, try to fetch from their URLs
  // Only fetch images for a limited number to avoid rate limiting
  const articlesNeedingImages = [...externalArticles, ...aiArticles].filter(
    (article) => !article.imageUrl && article.url && article.category === "external"
  );

  console.log(`[Article Service] Found ${articlesNeedingImages.length} articles needing images`);

  // Fetch images in batches to avoid overwhelming the API
  const imageFetchPromises = articlesNeedingImages.slice(0, 10).map(async (article) => {
    console.log(`[Article Service] Fetching image for: ${article.title}`);
    const fetchedImageUrl = await fetchArticleImageFromUrl(article.url!);
    if (fetchedImageUrl) {
      console.log(`[Article Service] ✓ Got image for "${article.title}": ${fetchedImageUrl}`);
    } else {
      console.log(`[Article Service] ✗ No image found for "${article.title}"`);
    }
    return { article, imageUrl: fetchedImageUrl };
  });

  const imageResults = await Promise.all(imageFetchPromises);
  const imageMap = new Map(
    imageResults
      .filter((result) => result.imageUrl) // Only include successful results
      .map((result) => [result.article.id, result.imageUrl])
  );

  console.log(`[Article Service] Successfully fetched ${imageMap.size} images`);

  const articlesWithImages = [...externalArticles, ...aiArticles].map((article) => {
    if (article.imageUrl) {
      return article;
    }
    const fetchedImageUrl = imageMap.get(article.id);
    if (fetchedImageUrl) {
      return { ...article, imageUrl: fetchedImageUrl };
    }
    return article;
  });

  const allArticles = articlesWithImages.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      articles: allArticles,
      timestamp: Date.now()
    })
  );

  return allArticles;
}

/**
 * Get article by ID
 */
export function getArticleById(id: string): Article | null {
  const allArticles = getAIArticles();
  const cached = localStorage.getItem(CACHE_KEY);
  
  if (cached) {
    try {
      const { articles } = JSON.parse(cached);
      const found = articles.find((a: Article) => a.id === id);
      if (found) return found;
    } catch (error) {
      console.warn("Failed to parse cached articles:", error);
    }
  }

  const aiArticle = allArticles.find((a) => a.id === id);
  return aiArticle || null;
}

/**
 * Get AI-generated articles from localStorage
 */
export function getAIArticles(): Article[] {
  const aiArticlesKey = "orca_ai_articles";
  const cached = localStorage.getItem(aiArticlesKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      console.warn("Failed to parse AI articles:", error);
    }
  }
  return [];
}

/**
 * Save an AI-generated article
 */
export function saveAIArticle(article: Omit<Article, "id" | "category">): void {
  const aiArticles = getAIArticles();
  const newArticle: Article = {
    ...article,
    id: `ai-${Date.now()}`,
    category: "ai-generated"
  };

  aiArticles.unshift(newArticle);
  localStorage.setItem("orca_ai_articles", JSON.stringify(aiArticles));

  // Invalidate main cache to force refresh
  localStorage.removeItem(CACHE_KEY);
}

/**
 * Clear article cache
 */
export function clearArticleCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

