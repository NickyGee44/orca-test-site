/**
 * Component to inject Google Tag Manager scripts into the HTML head and body
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGTMConfig } from "../services/gtmService";

export function GTMHead() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    
    try {
    const config = getGTMConfig();
    
    if (!config.enabled || !config.containerId) {
      // Remove GTM if disabled
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`);
      const existingNoscript = document.querySelector('noscript iframe[src*="googletagmanager.com/ns.html"]');
      if (existingScript) existingScript.remove();
      if (existingNoscript?.parentElement) existingNoscript.parentElement.remove();
      return;
    }

    // Check if GTM is already loaded for this container ID
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${config.containerId}"]`);
    if (existingScript) {
      return; // Already loaded, don't duplicate
    }

    // Inject GTM script into head
    const gtmScript = document.createElement("script");
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${config.containerId}');`;
    document.head.appendChild(gtmScript);

    // Inject noscript iframe into body (only if not already present)
    const existingNoscript = document.querySelector(`noscript iframe[src*="googletagmanager.com/ns.html?id=${config.containerId}"]`);
    if (!existingNoscript && document.body) {
      const noscript = document.createElement("noscript");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${config.containerId}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }
    } catch (error) {
      console.warn("Error injecting GTM:", error);
    }
  }, [location.pathname]); // Re-check on route change

  return null;
}
