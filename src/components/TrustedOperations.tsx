/**
 * Trusted Operations section for homepage
 * Shows image + trust statements + proof metrics
 */

import { ImageBlock } from "./ImageBlock";
import type { ImageSection, MetricSection } from "../types/content";

interface TrustedOperationsProps {
  title?: string;
  image?: ImageSection;
  trustStatements?: string[];
  metrics?: MetricSection[];
}

export function TrustedOperations({
  title = "Trusted by Top Retail Enterprises",
  image,
  trustStatements = [],
  metrics = []
}: TrustedOperationsProps) {
  return (
    <section className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2 sm:p-8">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Image side */}
        <div className="relative">
          {image?.imageUrl ? (
            <ImageBlock
              imageUrl={image.imageUrl}
              alt={image.alt || "Trusted operations"}
              layout="contained"
              overlay={true}
            />
          ) : (
            <div className="relative h-64 w-full overflow-hidden rounded-panel border border-slate-800/70 bg-gradient-to-br from-slate-900/80 to-slate-950/80">
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                <span className="text-sm">Image placeholder</span>
              </div>
            </div>
          )}
        </div>

        {/* Content side */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-50 sm:text-3xl">
              {title}
            </h2>
            {trustStatements.length > 0 && (
              <ul className="space-y-3 text-sm text-slate-300">
                {trustStatements.map((statement, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 text-cyan-400">✓</span>
                    <span>{statement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Proof metrics */}
          {metrics.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4"
                >
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    {metric.label}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-cyan-400">
                    {metric.value}
                  </div>
                  {metric.hint && (
                    <div className="mt-1 text-[12px] text-slate-400">{metric.hint}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
