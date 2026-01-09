import type { Article } from "../services/articleService";

interface ArticleCardProps {
  article: Article;
}

import { Link } from "react-router-dom";

/**
 * Strip HTML tags from text (safety fallback)
 */
function stripHtml(text: string): string {
  if (!text) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = text;
  const cleanText = tmp.textContent || tmp.innerText || "";
  return cleanText.replace(/\s+/g, " ").trim() || text.replace(/<[^>]*>/g, "").trim();
}

export function ArticleCard({ article }: ArticleCardProps) {
  const isExternal = article.category === "external";
  const isAI = article.category === "ai-generated";
  
  // Strip any HTML that might have slipped through
  const cleanDescription = stripHtml(article.description);

  const FALLBACK_IMAGE = "/images/placeholders/article-fallback.jpg";

  return (
    <Link
      to={`/news/${article.id}`}
      className="block glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 shadow-orca-panel transition-all hover:border-slate-700/50 hover:shadow-orca-depth-2"
    >
        <div className="relative h-36 w-full overflow-hidden rounded-t-panel">
          <img
          src={article.imageUrl || FALLBACK_IMAGE}
            alt={article.title}
            className="h-full w-full object-cover"
            loading="lazy"
          decoding="async"
            onError={(e) => {
            // Fallback to placeholder if image fails
            const target = e.target as HTMLImageElement;
            if (target.src !== FALLBACK_IMAGE) {
              target.src = FALLBACK_IMAGE;
            } else {
              target.style.display = "none";
            }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          {isExternal && (
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[10px] font-medium text-cyan-200">
              External
            </span>
          )}
          {isAI && (
            <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-2 py-1 text-[10px] font-medium text-purple-200">
              AI Generated
            </span>
          )}
          <span className="text-[10px] text-slate-500">{article.source}</span>
          {article.date && (
            <span className="text-[10px] text-slate-500">
              {new Date(article.date).toLocaleDateString()}
            </span>
          )}
        </div>
        <h3 className="mb-2 text-base font-semibold text-slate-50 line-clamp-2">
          {article.title}
        </h3>
        <p className="mb-3 text-xs text-slate-300 sm:text-sm line-clamp-3">
          {cleanDescription}
        </p>
        <div className="flex items-center justify-between">
          {article.author && (
            <div className="text-[10px] text-slate-400">By {article.author}</div>
          )}
          <span className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

