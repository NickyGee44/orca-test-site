import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { Link } from "react-router-dom";
import type { ModuleSection, CTASection } from "../types/content";

export function ProductPage() {
  usePageMetadata({
    title: "Platform – Orca Freight Audit Platform",
    description:
      "See how Orca unifies freight audit, payment, claims, and analytics into a single AI-assisted platform."
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

      {modules.length > 0 && (
      <section className="space-y-8">
        {modules.map((module, idx) => (
          <div
            key={module.title}
            className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8"
          >
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] md:items-start">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                  {module.title}
                </h2>
                <p className="text-sm text-slate-300 sm:text-base">
                  {module.description}
                </p>
                {module.features && module.features.length > 0 && (
                <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
                    {module.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-cyan-400">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                )}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.15),_transparent_60%)] blur-2xl" />
                <div className="relative overflow-hidden rounded-panel border border-slate-800/70 bg-slate-950/60 p-4">
                  <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{module.title}</span>
                    <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-200">
                      Preview
                    </span>
                  </div>
                  <div className="space-y-2 rounded-tile bg-slate-900/60 p-3 text-xs text-slate-300">
                    <div className="h-2 w-3/4 rounded bg-slate-700" />
                    <div className="h-2 w-full rounded bg-slate-700" />
                    <div className="h-2 w-2/3 rounded bg-slate-700" />
                    <div className="mt-2 h-1 w-1/2 rounded bg-cyan-500/30" />
                  </div>
                  {module.preview && (
                  <p className="mt-3 text-[11px] text-slate-400">
                    {module.preview}
                  </p>
                  )}
                </div>
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

      {outcomes.length > 0 && (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-50">
          Platform outcomes
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
            {outcomes.map((outcome, i) => (
            <div
                key={i}
              className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4 text-sm text-slate-300"
            >
              {outcome}
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


