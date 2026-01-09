import { Link } from "react-router-dom";

export function ProductPreview() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          See Orca in action
        </h2>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          A unified platform for freight audit, payment, and analytics—all in
          one place.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-50">
              Dashboard overview
            </h3>
            <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-[10px] text-cyan-200">
              Live view
            </span>
          </div>
          {/* Visual chart representation */}
          <div className="mb-4 h-32 rounded-tile bg-gradient-to-br from-slate-950/80 to-slate-900/60 p-4">
            <div className="flex h-full items-end gap-2">
              {[65, 80, 72, 90, 85, 95, 88].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-cyan-400/60 to-purple-500/60"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-tile bg-slate-950/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Total spend (MTD)</span>
              <span className="font-semibold text-slate-50">$2.4M</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Exceptions flagged</span>
              <span className="font-semibold text-cyan-300">47</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Potential savings</span>
              <span className="font-semibold text-purple-300">$218k</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Real-time visibility into freight spend, exceptions, and savings
            opportunities.
          </p>
        </div>
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-50">
              Exceptions center
            </h3>
            <span className="rounded-full bg-purple-500/20 px-2 py-1 text-[10px] text-purple-200">
              AI-powered
            </span>
          </div>
          {/* Visual exception flow */}
          <div className="mb-4 flex items-center gap-2 rounded-tile bg-slate-950/60 p-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
              <span className="text-xl">⚠</span>
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-slate-200">AI Detection Active</div>
              <div className="text-[10px] text-slate-400">Scanning invoices in real-time</div>
            </div>
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="space-y-2 rounded-tile bg-slate-950/60 p-4">
            <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-xs text-slate-200">
              <div className="flex items-center justify-between">
                <span>Fuel surcharge variance</span>
                <span className="text-cyan-300">+12%</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                23 invoices • Chicago → Dallas
              </div>
            </div>
            <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-xs text-slate-200">
              <div className="flex items-center justify-between">
                <span>Duplicate billing detected</span>
                <span className="text-purple-300">3 matches</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Same shipment, multiple invoices
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            AI flags anomalies and exceptions automatically, so you focus on
            resolution.
          </p>
        </div>
      </div>
      <div className="text-center">
        <Link
          to="/product"
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/40 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:text-slate-50"
        >
          Explore all platform features →
        </Link>
      </div>
    </section>
  );
}

