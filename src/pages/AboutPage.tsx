import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { Link } from "react-router-dom";
import { ImageBlock } from "../components/ImageBlock";
import type { TimelineItemSection, ValueSection, CTASection, ImageSection } from "../types/content";

export function AboutPage() {
  usePageMetadata({
    title: "About Orca – 10 Years of Freight Audit",
    description:
      "Learn about Orca's ten-year journey in freight audit, the team behind the platform, and how we partner with shippers."
  });

  const { getSection } = usePageContent({
    pageId: "about"
  });

  const hero = getSection<{ title: string; description: string }>("hero", { title: "", description: "" });
  const story = getSection<string[]>("story", []);
  const timeline = getSection<TimelineItemSection[]>("timeline", []);
  const values = getSection<ValueSection[]>("values", []);
  const responsibility = getSection<{ title: string; paragraphs: string[] }>("responsibility", { title: "", paragraphs: [] });
  const finalCTA = getSection<CTASection>("finalCTA", { title: "", ctaPrimary: "", ctaPrimaryLink: "" });
  const teamImages = getSection<ImageSection[]>("teamImages", []);
  const timelineImage = getSection<ImageSection>("timelineImage", {});

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          {hero.title || "About Orca"}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          {hero.description || "Ten years of freight audit expertise, now enhanced with AI-powered analytics and automation."}
        </p>
      </section>

      {story.length > 0 && (
      <section className="space-y-6">
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
        <h2 className="mb-6 text-2xl font-semibold text-slate-50">
          The Orca story
        </h2>
        <div className="space-y-6 text-sm text-slate-300 sm:text-base">
            {story.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
        </div>
        </div>
        {teamImages && teamImages.length > 0 && teamImages[0]?.imageUrl && (
          <ImageBlock
            imageUrl={teamImages[0].imageUrl}
            alt={teamImages[0].alt || "Orca team"}
            layout="contained"
            overlay={true}
            className="aspect-[16/6] max-h-[280px]"
          />
        )}
      </section>
      )}

      {timeline.length > 0 && (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          Then → Now: 10 years of evolution
        </h2>
        {timelineImage?.imageUrl && (
          <div className="mb-6">
            <ImageBlock
              imageUrl={timelineImage.imageUrl}
              alt={timelineImage.alt || "Orca timeline"}
              layout="full-width"
              overlay={true}
              className="aspect-[21/6] max-h-[260px]"
            />
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, idx) => (
            <div
                key={idx}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-5 shadow-orca-panel"
            >
              <div className="mb-2 text-2xl font-bold text-cyan-400">
                {item.year}
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-50">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 sm:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      )}

      {values.length > 0 && (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          Mission & values
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, idx) => (
            <div
                key={idx}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel"
            >
              <h3 className="mb-2 text-lg font-semibold text-slate-50">
                {value.title}
              </h3>
              <p className="text-sm text-slate-300">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {responsibility && responsibility.title && (
      <section className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">
            {responsibility.title}
        </h2>
          {responsibility.paragraphs && responsibility.paragraphs.map((paragraph, idx) => (
            <p key={idx} className={`text-sm text-slate-300 ${idx > 0 ? "mt-4" : ""}`}>
              {paragraph}
            </p>
          ))}
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


