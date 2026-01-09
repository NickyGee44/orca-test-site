/**
 * Content service for managing page content
 * For MVP, uses localStorage. In production, will use Netlify Functions + JSON files
 */

import type { PageContent } from "../types/content";

const CONTENT_STORAGE_PREFIX = "orca_content_";

/**
 * Get page content
 */
export async function getPageContent(pageId: string): Promise<PageContent | null> {
  try {
    const stored = localStorage.getItem(`${CONTENT_STORAGE_PREFIX}${pageId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading page content for ${pageId}:`, error);
  }
  return null;
}

/**
 * Save page content
 */
export async function savePageContent(
  pageId: string,
  sections: Record<string, any>,
  modifiedBy: string = "admin"
): Promise<{ success: boolean; error?: string }> {
  try {
    const content: PageContent = {
      pageId,
      sections,
      lastModified: new Date().toISOString(),
      modifiedBy
    };

    localStorage.setItem(`${CONTENT_STORAGE_PREFIX}${pageId}`, JSON.stringify(content));
    
    // In production, this would call a Netlify Function to save to JSON file
    // await fetch('/api/content/update', { method: 'POST', body: JSON.stringify(content) });
    
    return { success: true };
  } catch (error) {
    console.error(`Error saving page content for ${pageId}:`, error);
    return { success: false, error: "Failed to save content" };
  }
}

/**
 * List all pages
 */
export async function listPages(): Promise<string[]> {
  // For MVP, return hardcoded list. In production, read from data directory
  return [
    "homepage",
    "solutions",
    "product",
    "ai",
    "results",
    "about",
    "resources",
    "contact"
  ];
}
