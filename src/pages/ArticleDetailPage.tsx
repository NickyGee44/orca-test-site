import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { getArticleById, type Article } from "../services/articleService";

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!id) {
        navigate("/resources");
        return;
      }

      setIsLoading(true);
      const foundArticle = getArticleById(id);
      
      if (!foundArticle) {
        // Try fetching fresh articles
        const { getArticles } = await import("../services/articleService");
        const articles = await getArticles();
        const found = articles.find((a) => a.id === id);
        
        if (found) {
          setArticle(found);
        } else {
          navigate("/resources");
        }
      } else {
        setArticle(foundArticle);
      }
      
      setIsLoading(false);
    }

    loadArticle();
  }, [id, navigate]);

  usePageMetadata({
    title: article ? `${article.title} – Orca News` : "Article – Orca News",
    description: article?.description || "Read the latest news and insights from Orca."
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-slate-400">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="text-slate-400">Article not found</div>
        <Link
          to="/resources"
          className="text-cyan-400 hover:text-cyan-300"
        >
          ← Back to News
        </Link>
      </div>
    );
  }

  const isExternal = article.category === "external";
  const isAI = article.category === "ai-generated";

  return (
    <div className="space-y-8">
      <Link
        to="/resources"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition"
      >
        ← Back to News
      </Link>

      <article className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
        {article.imageUrl && (
          <div className="relative mb-6 h-64 w-full overflow-hidden rounded-panel sm:h-96">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        )}

        <header className="mb-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {isExternal && (
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                External News
              </span>
            )}
            {isAI && (
              <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-200">
                AI Generated
              </span>
            )}
            <span className="text-xs text-slate-400">{article.source}</span>
            {article.date && (
              <span className="text-xs text-slate-400">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
            {article.title}
          </h1>

          {article.author && (
            <div className="text-sm text-slate-400">
              By <span className="text-slate-300">{article.author}</span>
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-slate-300 sm:prose-base">
          {/* Use full content if available, otherwise use description */}
          <div
            dangerouslySetInnerHTML={{
              __html: article.content 
                ? article.content 
                : article.description.replace(/\n/g, "<br />")
            }}
            className="article-content"
          />
        </div>

        {/* Sources and Citations */}
        {article.sources && article.sources.length > 0 && (
          <div className="mt-8 border-t border-slate-800/70 pt-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-50">Sources and References</h3>
            <ul className="space-y-2">
              {article.sources.map((source, index) => (
                <li key={index} className="text-sm text-slate-300">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline transition"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* External Article Link */}
        {article.url && (
          <div className="mt-8 border-t border-slate-800/70 pt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
            >
              Read original article →
            </a>
          </div>
        )}
      </article>
    </div>
  );
}

