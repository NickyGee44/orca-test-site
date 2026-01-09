import { useEffect, useState } from "react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { Link } from "react-router-dom";
import { getArticles, type Article } from "../services/articleService";
import { ArticleCard } from "../components/ArticleCard";
import { MetricsShowcase } from "../components/MetricsShowcase";
import { ImageBlock } from "../components/ImageBlock";
import { usePageContent } from "../hooks/usePageContent";
import type { ImageSection } from "../types/content";

export function ResourcesPage() {
  usePageMetadata({
    title: "News – Orca Freight Audit & Analytics",
    description:
      "Stay updated with the latest news, articles, and insights about Orca, freight audit, and supply chain analytics."
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "external" | "ai-generated">("all");

  const { getSection } = usePageContent({
    pageId: "resources"
  });

  const heroImage = getSection<ImageSection>("heroImage", {});

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  const filteredArticles =
    filter === "all"
      ? articles
      : articles.filter((article) => article.category === filter);

  return (
    <div className="space-y-8 sm:space-y-12">
      {heroImage?.imageUrl && (
        <div className="mb-8">
          <ImageBlock
            imageUrl={heroImage.imageUrl}
            alt={heroImage.alt || "News & Insights"}
            layout="full-width"
            overlay={true}
            className="aspect-[21/6] max-h-[260px]"
          />
        </div>
      )}
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          News & Insights
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          Stay updated with the latest news about Orca, freight audit trends, and
          insights from the supply chain industry.
        </p>
      </section>

      {/* Article Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-400">Filter:</span>
        {(["all", "external", "ai-generated"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              filter === filterOption
                ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                : "border-slate-700 bg-slate-900/40 text-slate-300 hover:border-slate-500"
            }`}
          >
            {filterOption === "all"
              ? "All Articles"
              : filterOption === "external"
              ? "External News"
              : "AI Generated"}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
        {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="text-center text-slate-400">Loading articles...</div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center">
          <div className="text-slate-400">
            No articles found. Try generating an AI article or check back later for
            external news.
          </div>
        </div>
      ) : (
        <section className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Metrics Showcase (replaces Tools section) */}
      <MetricsShowcase />

      <section className="text-center">
        <p className="mb-4 text-sm text-slate-300">
          Want to learn more about freight audit and analytics?
        </p>
        <Link
          to="/contact"
          className="inline-flex rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}


