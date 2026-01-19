import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { Link } from "react-router-dom";
import { ImageBlock } from "../components/ImageBlock";
import type { RoleSection, ModeSection, CTASection, ImageSection } from "../types/content";

export function SolutionsPage() {
  usePageMetadata({
    title: "Freight Audit Solutions | Finance, Logistics & Procurement | Orca",
    description:
      "Adaptable freight audit solutions for finance, logistics, and procurement teams. LTL, FTL, parcel, and ocean/air shipping audit with AI-powered cost recovery."
  });

  const { getSection } = usePageContent({
    pageId: "solutions"
  });

  const hero = getSection<{ title: string; description: string }>("hero", { title: "", description: "" });
  const roles = getSection<RoleSection[]>("roles", []);
  const modes = getSection<ModeSection[]>("modes", []);
  const finalCTA = getSection<CTASection>("finalCTA", { title: "", description: "", ctaPrimary: "", ctaPrimaryLink: "" });
  const modeImages = getSection<ImageSection[]>("modeImages", []);

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          {hero.title || "Solutions for every team and freight mode"}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          {hero.description || "Orca adapts to your organization's needs—whether you're in finance, logistics, or procurement, and whether you ship LTL, FTL, parcel, or ocean/air."}
        </p>
      </section>

      {roles.length > 0 && (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          By role
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role, idx) => (
            <div
                key={idx}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel"
            >
              <div className="mb-4 flex items-center gap-3">
                  {role.icon && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-lg">
                      {role.icon}
                </div>
                  )}
                <h3 className="text-xl font-semibold text-slate-50">
                  {role.title}
                </h3>
              </div>
              <p className="mb-4 text-sm text-slate-300">{role.description}</p>
                {role.benefits && role.benefits.length > 0 && (
              <ul className="mb-4 space-y-2 text-xs text-slate-300">
                    {role.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-cyan-400">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
                )}
                {role.metric && (
              <div className="rounded-tile border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-cyan-200">
                {role.metric}
              </div>
                )}
            </div>
          ))}
        </div>
      </section>
      )}

      {modes.length > 0 && (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          By freight mode
        </h2>
        {modeImages && modeImages.length > 0 && modeImages[0]?.imageUrl && (
          <div className="mb-6">
            <ImageBlock
              imageUrl={modeImages[0].imageUrl}
              alt={modeImages[0].alt || "Freight transportation modes"}
              layout="contained"
              overlay={true}
              className="aspect-[16/6] max-h-[280px]"
            />
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
            {modes.map((mode, idx) => (
            <div
                key={idx}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel"
            >
              <h3 className="mb-2 text-lg font-semibold text-slate-50">
                {mode.title}
              </h3>
              <p className="mb-4 text-sm text-slate-300">{mode.description}</p>
                {mode.benefits && mode.benefits.length > 0 && (
              <ul className="mb-4 space-y-1.5 text-xs text-slate-300">
                    {mode.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-purple-400">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
                )}
                {mode.example && (
              <div className="text-xs font-medium text-purple-300">
                {mode.example}
              </div>
                )}
            </div>
          ))}
        </div>
      </section>
      )}

      {finalCTA && finalCTA.title && (
      <section className="glass-panel rounded-panel border border-cyan-400/30 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 text-center shadow-orca-glow-cyan">
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


