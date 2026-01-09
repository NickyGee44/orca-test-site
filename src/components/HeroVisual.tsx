export function HeroVisual() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.5),_transparent_60%)] blur-3xl opacity-50" />
      <div className="relative overflow-hidden rounded-panel border border-cyan-400/30 bg-slate-900/70 p-4 shadow-orca-glow-cyan">
        {/* Dashboard preview visual */}
        <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
          <span>Orca Intelligence</span>
          <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-200">
            AI insight
          </span>
        </div>
        <div className="space-y-2 text-xs text-slate-200">
          <div className="rounded-tile bg-slate-900/80 px-3 py-2">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Active monitoring</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Flag LTL invoices with fuel surcharge variance &gt; 8% vs last quarter.
            </div>
          </div>
          <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-cyan-100">
            <div className="mb-1 font-medium">47 invoices matched</div>
            <div className="text-[11px] text-slate-300">
              $218k potential overcharge identified
            </div>
          </div>
          <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-slate-300">
            <div className="text-[11px]">
              Top lanes: Chicago → Dallas, LA → Phoenix, Memphis → Atlanta
            </div>
          </div>
        </div>
        {/* Visual data flow indicator */}
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-400/50 to-purple-500/50"
              style={{
                animationDelay: `${i * 0.2}s`,
                animation: "pulse 2s ease-in-out infinite"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

