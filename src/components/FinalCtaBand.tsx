import { Link } from "react-router-dom";
import { trackCTAClick } from "../utils/analytics";

interface FinalCtaBandProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function FinalCtaBand({ 
  title, 
  description, 
  ctaText, 
  ctaLink 
}: FinalCtaBandProps = {}) {
  return (
    <section className="glass-panel rounded-panel border border-cyan-400/30 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 shadow-orca-glow-cyan sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          {title || "Ready to transform your freight audit process?"}
        </h2>
        <p className="mt-4 text-sm text-slate-300 sm:text-base">
          {description || "Join leading enterprises who trust Orca to audit millions of invoices and surface actionable insights—all powered by AI and a decade of freight data."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={ctaLink || "/contact"}
            onClick={() => trackCTAClick(ctaText || "Book a demo", "final_cta_band")}
            className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
          >
            {ctaText || "Book a demo"}
          </Link>
          <Link
            to="/results"
            className="rounded-full border border-slate-700 bg-slate-900/40 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-slate-50"
          >
            See customer results
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          No credit card required • Free analysis of your freight spend •
          Enterprise-ready security
        </p>
      </div>
    </section>
  );
}

