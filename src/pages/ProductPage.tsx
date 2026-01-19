import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { Link } from "react-router-dom";
import type { ModuleSection, CTASection } from "../types/content";

export function ProductPage() {
  usePageMetadata({
    title: "Freight Audit Platform | Invoice Auditing & Payment | Orca",
    description:
      "Unified freight audit, payment, and analytics platform. 100% invoice accuracy, AI-powered exception detection, and streamlined payables workflow."
  });

  const { getSection } = usePageContent({
    pageId: "product"
  });

  const hero = getSection<{ title: string; description: string }>("hero", { title: "", description: "" });
  const modules = getSection<ModuleSection[]>("modules", []);
  const integrations = getSection<{ title: string; description: string; items: string[] }>("integrations", { title: "", description: "", items: [] });
  const outcomes = getSection<string[]>("outcomes", []);
  const finalCTA = getSection<CTASection>("finalCTA", { title: "", ctaPrimary: "", ctaPrimaryLink: "" });

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          {hero.title || "The Orca Platform"}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          {hero.description || "A unified platform for freight audit, payment, and analytics—all in one place, powered by AI and a decade of freight data."}
        </p>
      </section>

      {/* Outcomes moved to top per feedback */}
      {outcomes.length > 0 && (
      <section className="grid gap-4 sm:grid-cols-3">
          {outcomes.map((outcome, i) => (
          <div
              key={i}
            className="rounded-tile border border-cyan-400/20 bg-cyan-400/5 p-5 text-base text-slate-200 text-center font-medium"
          >
            {outcome}
          </div>
        ))}
      </section>
      )}

      {modules.length > 0 && (
      <section className="grid gap-6 sm:grid-cols-2">
        {modules.map((module) => (
          <div
            key={module.title}
            className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel"
          >
            <div className="flex items-start gap-4">
              {module.icon && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-2xl">
                  {module.icon}
                </div>
              )}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                  {module.title}
                </h2>
                {module.description && (
                  <p className="text-sm text-cyan-300">
                    {module.description}
                  </p>
                )}
                {module.features && module.features.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-slate-300 sm:text-sm">
                    {module.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 text-cyan-400">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      )}

      {integrations && integrations.title && (
      <section className="space-y-6">
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">
            {integrations.title}
        </h2>
          {integrations.description && (
        <p className="mb-4 text-sm text-slate-300">
              {integrations.description}
        </p>
          )}
          {integrations.items && integrations.items.length > 0 && (
        <div className="flex flex-wrap gap-2">
              {integrations.items.map((integration, i) => (
            <span
                  key={i}
              className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-xs text-slate-300"
            >
              {integration}
            </span>
          ))}
        </div>
            )}
        </div>
      </section>
      )}

      {/* Outcomes section removed from here - now at top */}

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


