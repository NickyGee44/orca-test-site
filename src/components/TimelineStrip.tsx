export function TimelineStrip() {
  const milestones = [
    { year: "2014", label: "Founded" },
    { year: "2017", label: "$1B audited" },
    { year: "2020", label: "AI engine launched" },
    { year: "2024", label: "$10B+ audited" }
  ];

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
          A decade of freight audit innovation
        </h2>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          From manual audit processes to AI-powered analytics—here's how we've
          evolved.
        </p>
      </div>
      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                {milestone.year}
              </div>
              <div className="text-xs text-slate-300 sm:text-sm">
                {milestone.label}
              </div>
              {index < milestones.length - 1 && (
                <div className="hidden h-0.5 w-12 bg-gradient-to-r from-cyan-400/50 to-purple-500/50 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

