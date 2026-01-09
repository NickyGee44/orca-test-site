interface ValuePropsGridProps {
  title?: string;
  subtitle?: string;
}

export function ValuePropsGrid({ title, subtitle }: ValuePropsGridProps = {}) {
  const valueProps = [
    {
      title: "Accuracy",
      description:
        "100% invoice accuracy through automated audit rules and AI-powered exception detection.",
      icon: "✓"
    },
    {
      title: "Savings",
      description:
        "Identify overcharges, duplicate billing, and contract violations—typically 3–8% of freight spend.",
      icon: "$"
    },
    {
      title: "Visibility",
      description:
        "Real-time dashboards, lane-level analytics, and benchmarking against industry norms.",
      icon: "📊"
    },
    {
      title: "Compliance",
      description:
        "Automated GL coding, accrual management, and audit trails for finance and procurement teams.",
      icon: "🔒"
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          {title || "Why Orca?"}
        </h2>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          {subtitle || "A decade of freight audit expertise, now enhanced with AI-driven analytics and automation."}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((prop) => (
          <div
            key={prop.title}
            className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-5 shadow-orca-panel transition hover:border-slate-700/50"
          >
            <div className="mb-3 text-2xl">{prop.icon}</div>
            <h3 className="mb-2 text-base font-semibold text-slate-50">
              {prop.title}
            </h3>
            <p className="text-xs text-slate-300 sm:text-sm">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

