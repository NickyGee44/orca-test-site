import { useEffect, useState, useRef } from "react";

interface Metric {
  label: string;
  value: string | number;
  suffix?: string;
  icon: string;
  category: "scale" | "impact" | "trust";
  description?: string;
}

const metrics: Metric[] = [
  {
    label: "Spend audited",
    value: 10,
    suffix: "B+",
    icon: "$",
    category: "scale",
    description: "Across all modes and regions"
  },
  {
    label: "Invoices processed",
    value: "Millions",
    suffix: "/year",
    icon: "📄",
    category: "scale",
    description: "High-volume enterprise freight"
  },
  {
    label: "Years in operation",
    value: 10,
    suffix: "+",
    icon: "📅",
    category: "trust",
    description: "A decade of freight audit expertise"
  },
  {
    label: "Average savings",
    value: 3,
    suffix: "-8%",
    icon: "💰",
    category: "impact",
    description: "Typical range from overcharge detection"
  },
  {
    label: "Freight modes",
    value: 4,
    suffix: "+",
    icon: "🚚",
    category: "scale",
    description: "LTL, FTL, parcel, ocean/air"
  },
  {
    label: "Invoice accuracy",
    value: 100,
    suffix: "%",
    icon: "✓",
    category: "impact",
    description: "Through automated audit rules"
  }
];

function AnimatedCounter({
  value,
  suffix,
  duration = 2000
}: {
  value: number | string;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated || typeof value !== "number") {
      setDisplayValue(value as number);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startValue = 0;
          const endValue = value;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

            setDisplayValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(endValue);
            }
          };

          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  if (typeof value !== "number") {
    return (
      <div className="text-3xl font-bold text-cyan-400 sm:text-4xl">
        {value}
        {suffix && <span className="text-2xl">{suffix}</span>}
      </div>
    );
  }

  return (
    <div ref={ref} className="text-3xl font-bold text-cyan-400 sm:text-4xl">
      {displayValue.toLocaleString()}
      {suffix && <span className="text-2xl">{suffix}</span>}
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="group glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel transition-all hover:border-cyan-500/30 hover:shadow-orca-glow-cyan">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-3xl">{metric.icon}</div>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wide ${
            metric.category === "scale"
              ? "bg-cyan-500/20 text-cyan-300"
              : metric.category === "impact"
              ? "bg-purple-500/20 text-purple-300"
              : "bg-green-500/20 text-green-300"
          }`}
        >
          {metric.category}
        </span>
      </div>
      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
      <div className="mt-2 text-sm font-semibold text-slate-50">{metric.label}</div>
      {metric.description && (
        <div className="mt-1 text-xs text-slate-400">{metric.description}</div>
      )}
    </div>
  );
}

export function MetricsShowcase() {
  const scaleMetrics = metrics.filter((m) => m.category === "scale");
  const impactMetrics = metrics.filter((m) => m.category === "impact");
  const trustMetrics = metrics.filter((m) => m.category === "trust");

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          Orca by the numbers
        </h2>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Real metrics from a decade of freight audit excellence
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-300">Scale</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scaleMetrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-300">Impact</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactMetrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-300">Trust</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustMetrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

