import { useState } from "react";
import { saveAIArticle } from "../services/articleService";
import { generateFullArticle } from "../services/articleGenerator";

export function AIArticleGenerator() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedArticle(null);

    try {
      // Simulate AI generation delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Generate comprehensive full-length article
      const article = generateFullArticle(topic);

      saveAIArticle(article);
      setGeneratedArticle({
        title: article.title,
        description: article.description
      });
      setTopic("");
    } catch (error) {
      console.error("Error generating article:", error);
      alert("Failed to generate article. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel rounded-panel border border-purple-400/30 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 shadow-orca-glow-purple">
      <h3 className="mb-4 text-lg font-semibold text-slate-50">
        Generate AI Article
      </h3>
      <p className="mb-4 text-xs text-slate-300 sm:text-sm">
        Enter a topic and let Orca Intelligence generate an article for you.
      </p>
      <div className="space-y-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., AI-powered freight audit, supply chain analytics..."
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-purple-400"
          onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="w-full rounded-button bg-gradient-to-r from-purple-400 to-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-purple transition hover:shadow-orca-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate Article"}
        </button>
        {generatedArticle && (
          <div className="mt-4 rounded-tile border border-purple-400/20 bg-purple-400/5 p-4">
            <div className="mb-2 text-xs font-medium text-purple-200">
              Article generated!
            </div>
            <div className="text-sm font-semibold text-slate-50">
              {generatedArticle.title}
            </div>
            <div className="mt-1 text-xs text-slate-300">
              {generatedArticle.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

