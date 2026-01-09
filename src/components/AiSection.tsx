import { Link } from "react-router-dom";

export function AiSection() {
  return (
    <section className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr),minmax(0,1.2fr)] md:items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-purple-200">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-orca-glow-purple" />
            Orca Intelligence
          </div>
          <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
            AI that learns your freight patterns
          </h2>
          <p className="text-sm text-slate-300 sm:text-base">
            Orca Intelligence uses machine learning to detect anomalies,
            surface patterns, and recommend actions—all grounded in 10 years of
            freight audit data.
          </p>
          <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-cyan-400">•</span>
              <span>
                Pattern detection: Identify duplicate billing, unexpected
                surcharges, and lane variance
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-purple-400">•</span>
              <span>
                Recommendations: Surface renegotiation targets, carrier mix
                shifts, and mode optimization opportunities
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-cyan-400">•</span>
              <span>
                Natural language exploration: Ask Orca about your freight data
                and get instant insights
              </span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              to="/ai"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/40 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:text-slate-50"
            >
              Learn more about Orca Intelligence →
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.25),_transparent_60%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-panel border border-purple-400/30 bg-slate-900/70 p-5 shadow-orca-glow-purple">
            <div className="mb-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>AI Insights</span>
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] text-purple-200">
                Active
              </span>
            </div>
            <div className="space-y-3 text-xs text-slate-200">
              <div className="rounded-tile bg-slate-900/80 px-3 py-2">
                <div className="mb-1 font-medium">Anomaly detected</div>
                <div className="text-[11px] text-slate-300">
                  Fuel surcharge variance on LTL lanes increased 12% vs last
                  quarter
                </div>
              </div>
              <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-purple-100">
                <div className="mb-1 font-medium">Recommendation</div>
                <div className="text-[11px] text-slate-300">
                  Review carrier contracts for Chicago → Dallas route; potential
                  renegotiation opportunity
                </div>
              </div>
              <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-cyan-100">
                <div className="mb-1 font-medium">Pattern identified</div>
                <div className="text-[11px] text-slate-300">
                  Duplicate billing pattern detected across 3 carriers; automated
                  flagging enabled
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

