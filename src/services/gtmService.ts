/**
 * Google Tag Manager service for managing GTM configuration
 */

const GTM_STORAGE_KEY = "orca_gtm_config";

export interface GTMConfig {
  containerId: string;
  enabled: boolean;
}

/**
 * Get GTM configuration
 */
export function getGTMConfig(): GTMConfig {
  try {
    const stored = localStorage.getItem(GTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading GTM config:", error);
  }
  
  return {
    containerId: "",
    enabled: false
  };
}

/**
 * Save GTM configuration
 */
export function saveGTMConfig(config: GTMConfig): { success: boolean; error?: string } {
  try {
    localStorage.setItem(GTM_STORAGE_KEY, JSON.stringify(config));
    
    // In production, this would call a Netlify Function
    // await fetch('/api/gtm/update', { method: 'POST', body: JSON.stringify(config) });
    
    return { success: true };
  } catch (error) {
    console.error("Error saving GTM config:", error);
    return { success: false, error: "Failed to save GTM configuration" };
  }
}
