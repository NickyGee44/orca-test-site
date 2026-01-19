import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { Link } from "react-router-dom";
import { ImageBlock } from "../components/ImageBlock";
import type { CaseStudySection, MetricSection, CTASection, ImageSection } from "../types/content";

export function ResultsPage() {
  usePageMetadata({
    title: "Freight Audit Results & Case Studies | Orca",
    description:
      "See real results from Orca's freight audit programs. Enterprise shippers achieve 3-8% savings, 60% faster invoice processing, and improved carrier performance."
  });

  const { getSection } = usePageContent({
    pageId: "results"
  });

  const hero = getSection<{ title: string; description: string }>("hero", { title: "", description: "" });
  const caseStudies = getSection<CaseStudySection[]>("caseStudies", []);
  const aggregateMetrics = getSection<MetricSection[]>("aggregateMetrics", []);
  const finalCTA = getSection<CTASection>("finalCTA", { title: "", ctaPrimary: "", ctaPrimaryLink: "" });
  const caseStudyImages = getSection<ImageSection[]>("caseStudyImages", []);

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          {hero.title || "Results that speak for themselves"}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          {hero.description || "10 years of audited spend. Here's what that looks like in outcomes for our customers."}
        </p>
      </section>

      {caseStudies.length > 0 && (
      <section className="space-y-8">
        {caseStudies.map((study, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8"
          >
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-xl">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                  {study.title}
                </h2>
              </div>
            </div>
            {caseStudyImages && caseStudyImages[idx]?.imageUrl && (
              <div className="mb-6">
                <ImageBlock
                  imageUrl={caseStudyImages[idx].imageUrl}
                  alt={caseStudyImages[idx].alt || `${study.title} case study`}
                  layout="contained"
                  overlay={true}
                  className="aspect-[16/6] max-h-[240px]"
                />
              </div>
            )}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Problem
                </h3>
                <p className="text-sm text-slate-300">{study.problem}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Approach
                </h3>
                <p className="text-sm text-slate-300">{study.approach}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Results
                </h3>
                {study.results && study.results.length > 0 && (
                <ul className="space-y-2 text-sm text-slate-300">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-cyan-400">•</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
                )}
              </div>
            </div>
            <div className="mt-6 rounded-tile border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="mb-2 text-sm italic text-slate-200">
                "{study.quote}"
              </p>
              <p className="text-xs text-slate-400">{study.author}</p>
            </div>
          </div>
        ))}
      </section>
      )}

      {aggregateMetrics.length > 0 && (
      <section className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
        <h2 className="mb-6 text-2xl font-semibold text-slate-50">
          Aggregate impact
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
            {aggregateMetrics.map((metric, idx) => (
            <div
                key={idx}
              className="text-center"
            >
              <div className="text-3xl font-bold text-cyan-400">
                {metric.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-50">
                {metric.label}
              </div>
                {metric.hint && (
              <div className="mt-1 text-xs text-slate-400">
                    {metric.hint}
              </div>
                )}
            </div>
          ))}
        </div>
      </section>
      )}

      {finalCTA && finalCTA.ctaPrimary && (
      <section className="text-center">
        <Link
            to={finalCTA.ctaPrimaryLink || "/contact"}
          className="inline-flex rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
        >
            {finalCTA.ctaPrimary}
        </Link>
      </section>
      )}
    </div>
  );
}


