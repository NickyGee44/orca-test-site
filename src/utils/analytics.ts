/**
 * Analytics utility for tracking events
 * Supports Google Analytics and Plausible
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number>
) {
  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties);
  }

  // Plausible Analytics
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(eventName, {
      props: properties as Record<string, string>
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log("Analytics event:", eventName, properties);
  }
}

export function trackCTAClick(ctaText: string, location: string) {
  trackEvent("cta_click", {
    cta_text: ctaText,
    location
  });
}

export function trackDemoRequest(source: string) {
  trackEvent("demo_request", {
    source
  });
}

export function trackPageView(page: string) {
  trackEvent("page_view", {
    page
  });
}

export function trackScrollDepth(depth: number, page: string) {
  trackEvent("scroll_depth", {
    depth: depth.toString(),
    page
  });
}

