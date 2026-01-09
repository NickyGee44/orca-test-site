/**
 * Builder.io service configuration
 * Manages Builder.io API key and builder instance
 */

import { builder } from "@builder.io/react";

// Builder.io API key - in production, move to environment variable
const BUILDER_API_KEY = "bpk-75435189e8f04d8894e8f009b495b4dc";

// Initialize Builder.io (lazy initialization to avoid blocking app startup)
let initialized = false;

export function initBuilder() {
  if (initialized) return;
  
  try {
builder.init(BUILDER_API_KEY);

// Register custom components (your existing React components)
// This allows you to use them visually in Builder.io
    // Use dynamic import to avoid blocking if components don't exist
    import("./builderComponents").catch((err) => {
      console.warn("Failed to load Builder.io components:", err);
    });
    
    initialized = true;
  } catch (error) {
    console.warn("Failed to initialize Builder.io:", error);
  }
}

// Auto-initialize, but wrapped in try-catch
initBuilder();

export { builder };
export const BUILDER_MODEL = "page"; // The model name for pages in Builder.io
