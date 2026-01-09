/**
 * Utility to export current page content to Builder.io format
 * This helps you recreate your existing pages in Builder.io
 */

import { getPageContent } from "../services/contentService";
import { getDefaultContentForPage } from "../services/pageDefaults";
import type { PageContent } from "../types/content";

/**
 * Export page content as JSON that can be used as reference in Builder.io
 */
export async function exportPageContent(pageId: string): Promise<string> {
  try {
    // Try to get CMS content first
    let content: PageContent | null = null;
    try {
      content = await getPageContent(pageId);
    } catch {
      // Fall back to defaults
    }

    // If no CMS content, use defaults
    if (!content) {
      const defaultSections = getDefaultContentForPage(pageId);
      content = {
        pageId,
        sections: defaultSections,
        lastModified: new Date().toISOString(),
        modifiedBy: "system"
      };
    }

    // Format for easy reading in Builder.io
    const exportData = {
      pageId: content.pageId,
      url: getPageUrl(pageId),
      sections: content.sections,
      notes: {
        message: "Use this as a reference when recreating this page in Builder.io",
        instructions: [
          "1. Create a new page in Builder.io with the URL above",
          "2. Use the registered custom components (ValuePropsGrid, ServicesOverview, etc.)",
          "3. Recreate the sections using the data below as reference",
          "4. You can drag and drop your custom components from the components panel"
        ]
      }
    };

    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error(`Error exporting page ${pageId}:`, error);
    throw error;
  }
}

/**
 * Get the URL path for a page ID
 */
function getPageUrl(pageId: string): string {
  const urlMap: Record<string, string> = {
    homepage: "/",
    solutions: "/solutions",
    product: "/product",
    ai: "/ai",
    results: "/results",
    about: "/about",
    resources: "/resources",
    contact: "/contact"
  };
  return urlMap[pageId] || `/${pageId}`;
}

/**
 * Export all pages at once
 */
export async function exportAllPages(): Promise<Record<string, string>> {
  const pageIds = [
    "homepage",
    "solutions",
    "product",
    "ai",
    "results",
    "about",
    "resources",
    "contact"
  ];

  const exports: Record<string, string> = {};

  for (const pageId of pageIds) {
    try {
      exports[pageId] = await exportPageContent(pageId);
    } catch (error) {
      console.error(`Failed to export ${pageId}:`, error);
      exports[pageId] = `Error: ${error}`;
    }
  }

  return exports;
}

/**
 * Download page content as JSON file
 */
export function downloadPageExport(pageId: string, content: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${pageId}-builder-export.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
