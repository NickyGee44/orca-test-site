/**
 * Component to inject SEO tags into HTML head
 * Reads from SEO service and injects meta tags, OpenGraph, Twitter Cards, and structured data
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGlobalSEO, getPageSEO } from "../services/seoService";

export function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    async function injectSEOTags() {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      
      try {
      const globalSEO = await getGlobalSEO();
      
      // Get page ID from pathname
      const pageId = location.pathname === "/" ? "homepage" : location.pathname.slice(1).split("/")[0];
      const pageSEO = await getPageSEO(pageId);

      // Determine title and description
      const title = pageSEO?.title || globalSEO.defaultTitle;
      const description = pageSEO?.description || globalSEO.defaultDescription;
      const ogTitle = pageSEO?.ogTitle || title;
      const ogDescription = pageSEO?.ogDescription || description;
      const ogImage = pageSEO?.ogImage || globalSEO.defaultImage;
      const canonical = pageSEO?.canonical || `${window.location.origin}${location.pathname}`;

      // Update or create title
      document.title = title;

      // Update or create meta description
      updateOrCreateMeta("name", "description", description);

      // OpenGraph tags
      updateOrCreateMeta("property", "og:title", ogTitle);
      updateOrCreateMeta("property", "og:description", ogDescription);
      updateOrCreateMeta("property", "og:image", ogImage);
      updateOrCreateMeta("property", "og:url", canonical);
      updateOrCreateMeta("property", "og:type", "website");
      updateOrCreateMeta("property", "og:site_name", globalSEO.siteName);

      // Twitter Card tags
      updateOrCreateMeta("name", "twitter:card", "summary_large_image");
      if (globalSEO.twitterHandle) {
        updateOrCreateMeta("name", "twitter:site", globalSEO.twitterHandle);
        updateOrCreateMeta("name", "twitter:creator", globalSEO.twitterHandle);
      }
      updateOrCreateMeta("name", "twitter:title", ogTitle);
      updateOrCreateMeta("name", "twitter:description", ogDescription);
      updateOrCreateMeta("name", "twitter:image", ogImage);

      // Canonical URL
      updateOrCreateLink("canonical", canonical);

      // Structured data (JSON-LD)
      if (pageSEO?.schema) {
        injectStructuredData(pageSEO.schema);
      } else {
        // Default organization structured data
        injectStructuredData({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": globalSEO.siteName,
          "url": typeof window !== "undefined" ? window.location.origin : "",
          "description": globalSEO.defaultDescription
        });
      }
      } catch (error) {
        console.warn("Error injecting SEO tags:", error);
      }
    }

    injectSEOTags();
  }, [location.pathname]);

  return null;
}

function updateOrCreateMeta(attribute: "name" | "property", value: string, content: string) {
  if (!content) return;

  let meta = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, value);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateOrCreateLink(rel: string, href: string) {
  if (!href) return;

  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function injectStructuredData(schema: Record<string, any>) {
  // Remove existing structured data script
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Create new structured data script
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}
