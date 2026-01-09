import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllArticles, getArticleById, saveArticle, deleteArticle, createNewArticle } from "../../services/adminArticleService";
import { generateFullArticle } from "../../services/articleGenerator";
import { saveAIArticle } from "../../services/articleService";
import type { ArticleContent } from "../../types/content";

export function ArticlesManager() {
  const [articles, setArticles] = useState<ArticleContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const allArticles = await getAllArticles();
      setArticles(allArticles);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    const newArticle = createNewArticle();
    setSelectedArticle(newArticle);
    setIsEditing(true);
  };

  const handleEdit = (article: ArticleContent) => {
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedArticle) return;

    setIsSaving(true);
    setMessage(null);

    const result = await saveArticle(selectedArticle);

    if (result.success) {
      setMessage({ type: "success", text: "Article saved successfully!" });
      setIsEditing(false);
      await loadArticles();
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save article" });
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    const result = await deleteArticle(id);
    if (result.success) {
      await loadArticles();
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
        setIsEditing(false);
      }
    }
  };

  const handleGenerateAI = async () => {
    if (!aiTopic.trim()) return;

    setIsGenerating(true);
    setMessage(null);

    try {
      // Simulate AI generation delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Generate comprehensive full-length article
      const generatedArticle = generateFullArticle(aiTopic);

      // Save using articleService (which handles AI articles)
      saveAIArticle(generatedArticle);

      // Convert to ArticleContent format for admin
      const articleContent: ArticleContent = {
        id: `ai-${Date.now()}`,
        title: generatedArticle.title,
        content: generatedArticle.content || generatedArticle.description,
        excerpt: generatedArticle.description,
        author: generatedArticle.author || "Orca Intelligence",
        date: generatedArticle.date,
        category: "ai-generated",
        tags: [],
        imageUrl: generatedArticle.imageUrl,
        featured: false,
        published: true
      };

      // Save to admin articles as well
      await saveArticle(articleContent);

      setMessage({ type: "success", text: `Article "${generatedArticle.title}" generated successfully!` });
      setAiTopic("");
      setShowAIGenerator(false);
      await loadArticles();
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("Error generating article:", error);
      setMessage({ type: "error", text: "Failed to generate article. Please try again." });
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    if (filter === "published") return article.published;
    if (filter === "draft") return !article.published;
    return true;
  });

  if (isEditing && selectedArticle) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-slate-50">Edit Article</h1>
          <button
            onClick={() => {
              setIsEditing(false);
              setSelectedArticle(null);
            }}
            className="rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>

        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Title</label>
            <input
              type="text"
              value={selectedArticle.title}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Excerpt</label>
            <textarea
              value={selectedArticle.excerpt}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, excerpt: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Content (Markdown)</label>
            <textarea
              value={selectedArticle.content}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 font-mono text-sm text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              rows={15}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Author</label>
              <input
                type="text"
                value={selectedArticle.author}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, author: e.target.value })}
                className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Date</label>
              <input
                type="date"
                value={selectedArticle.date.split("T")[0]}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, date: new Date(e.target.value).toISOString() })}
                className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Tags (comma-separated)</label>
            <input
              type="text"
              value={selectedArticle.tags.join(", ")}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              placeholder="freight-audit, ai, logistics"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedArticle.published}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, published: e.target.checked })}
                className="rounded border-slate-700 bg-slate-900/70 text-cyan-400 focus:ring-cyan-400/20"
              />
              <span className="text-sm text-slate-300">Published</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedArticle.featured}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, featured: e.target.checked })}
                className="rounded border-slate-700 bg-slate-900/70 text-cyan-400 focus:ring-cyan-400/20"
              />
              <span className="text-sm text-slate-300">Featured</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Article"}
            </button>

            {message && (
              <div
                className={`rounded-md px-4 py-2 text-sm ${
                  message.type === "success"
                    ? "bg-green-500/10 text-green-300 border border-green-500/30"
                    : "bg-red-500/10 text-red-300 border border-red-500/30"
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">Articles Manager</h1>
          <p className="mt-2 text-sm text-slate-400">Create and manage news articles</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAIGenerator(!showAIGenerator)}
            className="rounded-button bg-gradient-to-r from-purple-400 to-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-purple transition hover:shadow-orca-glow-cyan"
          >
            {showAIGenerator ? "Cancel" : "🤖 Generate AI Article"}
          </button>
        <button
          onClick={handleCreateNew}
          className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
        >
          + New Article
        </button>
      </div>
      </div>

      {/* AI Article Generator */}
      {showAIGenerator && (
        <div className="glass-panel rounded-panel border border-purple-400/30 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 shadow-orca-glow-purple">
          <h3 className="mb-4 text-lg font-semibold text-slate-50">
            Generate AI Article
          </h3>
          <p className="mb-4 text-xs text-slate-300 sm:text-sm">
            Enter a topic and let Orca Intelligence generate a comprehensive article for you.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g., AI-powered freight audit, supply chain analytics..."
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-purple-400"
              onKeyPress={(e) => e.key === "Enter" && !isGenerating && handleGenerateAI()}
            />
            <button
              onClick={handleGenerateAI}
              disabled={!aiTopic.trim() || isGenerating}
              className="w-full rounded-button bg-gradient-to-r from-purple-400 to-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-purple transition hover:shadow-orca-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Generate Article"}
            </button>
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div
          className={`rounded-md px-4 py-2 text-sm ${
            message.type === "success"
              ? "bg-green-500/10 text-green-300 border border-green-500/30"
              : "bg-red-500/10 text-red-300 border border-red-500/30"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">Filter:</span>
        {(["all", "published", "draft"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              filter === filterOption
                ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                : "border-slate-700 bg-slate-900/40 text-slate-300 hover:border-slate-500"
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Articles List */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-slate-300">Loading articles...</div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-8 text-center shadow-orca-depth-2">
          <p className="text-slate-400">No articles found. Create your first article!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-4 shadow-orca-depth-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-50">{article.title || "Untitled"}</h3>
                    {article.published && (
                      <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">
                        Published
                      </span>
                    )}
                    {article.featured && (
                      <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-300">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{article.excerpt || "No excerpt"}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    {article.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{article.tags.join(", ")}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-300 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
