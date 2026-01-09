import { useEffect } from "react";
import { trackPageView } from "../utils/analytics";
import { getGlobalSEO, getPageSEO } from "../services/seoService";

interface PageMetadataOptions {
  title: string;
  description?: string;
}

export function usePageMetadata({ title, description }: PageMetadataOptions) {
  useEffect(() => {
    async function setMetadata() {
      // Check SEO service first for page-specific SEO
      const pageId = window.location.pathname === "/" ? "homepage" : window.location.pathname.slice(1).split("/")[0];
      const pageSEO = await getPageSEO(pageId);
      const globalSEO = await getGlobalSEO();

      // Use SEO service data if available, otherwise use provided fallback
      const finalTitle = pageSEO?.title || title || globalSEO.defaultTitle;
      const finalDescription = pageSEO?.description || description || globalSEO.defaultDescription;

      // Set title (SEOHead will also set this, but this ensures immediate update)
      document.title = finalTitle;

      // Set meta description (SEOHead will also set this, but this ensures immediate update)
      if (finalDescription) {
      let meta = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
        meta.content = finalDescription;
      }
    }

    setMetadata();

    // Track page view
    trackPageView(window.location.pathname);
  }, [title, description]);
}


