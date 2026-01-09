/**
 * SEO service for managing SEO settings
 */

import type { SEOConfig, GlobalSEO } from "../types/content";

const SEO_STORAGE_PREFIX = "orca_seo_";
const GLOBAL_SEO_KEY = "orca_seo_global";

/**
 * Get global SEO settings
 */
export async function getGlobalSEO(): Promise<GlobalSEO> {
  try {
    const stored = localStorage.getItem(GLOBAL_SEO_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading global SEO:", error);
  }

  // Default values
  return {
    siteName: "Orca",
    defaultTitle: "Orca – Freight Audit & Analytics AI",
    defaultDescription: "Orca is a Freight Audit & Analytics AI platform helping shippers gain accuracy, savings, and visibility across their supply chain.",
    defaultImage: "/orca-logo.png",
    twitterHandle: "@orcaaudit"
  };
}

/**
 * Save global SEO settings
 */
export async function saveGlobalSEO(seo: GlobalSEO): Promise<{ success: boolean; error?: string }> {
  try {
    localStorage.setItem(GLOBAL_SEO_KEY, JSON.stringify(seo));
    // In production: await fetch('/api/seo/global', { method: 'POST', body: JSON.stringify(seo) });
    return { success: true };
  } catch (error) {
    console.error("Error saving global SEO:", error);
    return { success: false, error: "Failed to save SEO settings" };
  }
}

/**
 * Get page-specific SEO
 */
export async function getPageSEO(pageId: string): Promise<SEOConfig | null> {
  try {
    const stored = localStorage.getItem(`${SEO_STORAGE_PREFIX}${pageId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading SEO for ${pageId}:`, error);
  }
  return null;
}

/**
 * Save page-specific SEO
 */
export async function savePageSEO(
  pageId: string,
  seo: Partial<SEOConfig>
): Promise<{ success: boolean; error?: string }> {
  try {
    const existing = await getPageSEO(pageId);
    const updated: SEOConfig = {
      pageId,
      ...existing,
      ...seo
    };
    
    localStorage.setItem(`${SEO_STORAGE_PREFIX}${pageId}`, JSON.stringify(updated));
    // In production: await fetch(`/api/seo/${pageId}`, { method: 'POST', body: JSON.stringify(updated) });
    return { success: true };
  } catch (error) {
    console.error(`Error saving SEO for ${pageId}:`, error);
    return { success: false, error: "Failed to save SEO settings" };
  }
}
