/**
 * Hook for loading and using page content from CMS
 * Provides fallback to default content if CMS content is not available
 */

import { useState, useEffect } from "react";
import { getPageContent } from "../services/contentService";
import { getDefaultContentForPage } from "../services/pageDefaults";
import type { PageContent } from "../types/content";

interface UsePageContentOptions {
  pageId: string;
  defaultContent?: PageContent["sections"];
}

export function usePageContent({ pageId, defaultContent }: UsePageContentOptions) {
  const [content, setContent] = useState<PageContent["sections"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCMSContent, setHasCMSContent] = useState(false);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      try {
        const cmsContent = await getPageContent(pageId);
        if (cmsContent && Object.keys(cmsContent.sections).length > 0) {
          setContent(cmsContent.sections);
          setHasCMSContent(true);
        } else {
          // Use provided default or get from pageDefaults
          const finalDefault = defaultContent || getDefaultContentForPage(pageId);
          setContent(finalDefault);
          setHasCMSContent(false);
        }
      } catch (error) {
        console.error(`Error loading content for ${pageId}:`, error);
        const finalDefault = defaultContent || getDefaultContentForPage(pageId);
        setContent(finalDefault);
        setHasCMSContent(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [pageId, defaultContent]);

  // Helper function to get a section with fallback
  const getSection = <T extends PageContent["sections"][string]>(
    sectionKey: string,
    fallback: T
  ): T => {
    if (content && content[sectionKey]) {
      return content[sectionKey] as T;
    }
    return fallback;
  };

  return {
    content,
    isLoading,
    hasCMSContent,
    getSection
  };
}
