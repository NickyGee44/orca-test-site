import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackScrollDepth } from "../utils/analytics";

const SCROLL_DEPTH_MARKERS = [25, 50, 75, 100];
const trackedDepths = new Set<string>();

export function useScrollTracking() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      SCROLL_DEPTH_MARKERS.forEach((marker) => {
        if (scrollPercent >= marker) {
          const key = `${location.pathname}-${marker}`;
          if (!trackedDepths.has(key)) {
            trackedDepths.add(key);
            trackScrollDepth(marker, location.pathname);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
}

