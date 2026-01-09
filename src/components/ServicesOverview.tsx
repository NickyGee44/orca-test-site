import { Link } from "react-router-dom";

export function ServicesOverview() {
  const services = [
    {
      title: "Freight Audit",
      description:
        "Automated invoice validation against contracts, rates, and historical patterns.",
      link: "/product"
    },
    {
      title: "Freight Payment",
      description:
        "Streamlined payables workflow with automated approvals and exception handling.",
      link: "/product"
    },
    {
      title: "Analytics & Reporting",
      description:
        "Self-serve dashboards, benchmarking, and trend analysis across your network.",
      link: "/ai"
    },
    {
      title: "Claims & Exceptions",
      description:
        "AI-flagged discrepancies with resolution workflows and carrier communication.",
      link: "/product"
    },
    {
      title: "Invoice Management",
      description:
        "Centralized invoice processing, GL coding, and accrual management.",
      link: "/product"
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          What we do
        </h2>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          End-to-end freight audit and analytics, from invoice ingestion to
          actionable insights.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.title}
            to={service.link}
            className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-5 shadow-orca-panel transition hover:border-cyan-500/30 hover:shadow-orca-glow-cyan"
          >
            <h3 className="mb-2 text-base font-semibold text-slate-50">
              {service.title}
            </h3>
            <p className="text-xs text-slate-300 sm:text-sm">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

