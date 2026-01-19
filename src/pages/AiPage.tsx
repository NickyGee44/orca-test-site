import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { Link } from "react-router-dom";
import { ImageBlock } from "../components/ImageBlock";
import type { CTASection, ImageSection } from "../types/content";

export function AiPage() {
  usePageMetadata({
    title: "AI & Data | Freight Analytics & Machine Learning | Orca",
    description:
      "AI-powered freight audit analytics. Machine learning detects anomalies, surfaces patterns, and recommends cost-saving actions across your supply chain."
  });

  const { getSection } = usePageContent({
    pageId: "ai"
  });

  const hero = getSection<{ badge?: string; title: string; description: string }>("hero", { title: "", description: "" });
  const capabilities = getSection<Array<{ title: string; description: string; examples: string[]; icon?: string }>>("capabilities", []);
  const dataFoundation = getSection<Array<{ title: string; description: string }>>("dataFoundation", []);
  const trustSecurity = getSection<Array<{ title: string; description: string }>>("trustSecurity", []);
  const finalCTA = getSection<CTASection>("finalCTA", { title: "", description: "", ctaPrimary: "", ctaPrimaryLink: "" });
  const heroBackgroundImage = getSection<ImageSection>("heroBackgroundImage", {});
  const architectureImage = getSection<ImageSection>("architectureImage", {});

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="space-y-6">
        {heroBackgroundImage?.imageUrl && (
          <div className="mb-6">
            <ImageBlock
              imageUrl={heroBackgroundImage.imageUrl}
              alt={heroBackgroundImage.alt || "AI data infrastructure"}
              layout="full-width"
              overlay={true}
              className="aspect-[21/6] max-h-[260px]"
            />
          </div>
        )}
        <div className="space-y-4 text-center">
          {hero.badge && (
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-purple-200 shadow-orca-glow-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-orca-glow-purple" />
              {hero.badge}
          </div>
          )}
          <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
            {hero.title || "AI that learns your freight patterns"}
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            {hero.description || "Orca Intelligence uses machine learning to detect anomalies, surface patterns, and recommend actions—all grounded in 10 years of freight audit data."}
          </p>
        </div>
      </section>

      {capabilities.length > 0 && (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          AI capabilities
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((capability, idx) => (
            <div
                key={idx}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel"
            >
              <div className="mb-4 flex items-center gap-3">
                  {capability.icon && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-400/20 to-cyan-400/20 text-2xl">
                      {capability.icon}
                </div>
                  )}
                <h3 className="text-lg font-semibold text-slate-50">
                  {capability.title}
                </h3>
              </div>
              <p className="mb-4 text-sm text-slate-300">
                {capability.description}
              </p>
                {capability.examples && capability.examples.length > 0 && (
              <ul className="space-y-1.5 text-xs text-slate-300">
                    {capability.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-purple-400">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
                )}
            </div>
          ))}
        </div>
      </section>
      )}

      {dataFoundation.length > 0 && (
      <section className="space-y-6">
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-slate-50">
            Data foundation
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
              {dataFoundation.map((item, idx) => (
                <div key={idx} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-50">
                    {item.title}
              </h3>
              <p className="text-sm text-slate-300">
                    {item.description}
              </p>
            </div>
              ))}
          </div>
        </div>
        {architectureImage?.imageUrl && (
          <ImageBlock
            imageUrl={architectureImage.imageUrl}
            alt={architectureImage.alt || "AI architecture"}
            layout="contained"
            overlay={true}
            className="aspect-[16/6] max-h-[280px]"
          />
        )}
      </section>
      )}

      {trustSecurity.length > 0 && (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          Trust, security, and governance
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trustSecurity.map((item, idx) => (
            <div
                key={idx}
              className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4"
            >
              <h3 className="mb-2 text-sm font-semibold text-slate-50">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {finalCTA && finalCTA.title && (
      <section className="glass-panel rounded-panel border border-purple-400/30 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 text-center shadow-orca-glow-purple">
        <h2 className="mb-4 text-xl font-semibold text-slate-50 sm:text-2xl">
            {finalCTA.title}
        </h2>
          {finalCTA.description && (
        <p className="mb-6 text-sm text-slate-300">
              {finalCTA.description}
        </p>
          )}
          {finalCTA.ctaPrimary && (
        <Link
              to={finalCTA.ctaPrimaryLink || "/contact"}
          className="inline-flex rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
        >
              {finalCTA.ctaPrimary}
        </Link>
          )}
      </section>
      )}
    </div>
  );
}


