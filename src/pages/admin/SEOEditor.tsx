import { useState, useEffect } from "react";
import { getGlobalSEO, saveGlobalSEO, getPageSEO, savePageSEO } from "../../services/seoService";
import { listPages } from "../../services/contentService";
import type { GlobalSEO, SEOConfig } from "../../types/content";

export function SEOEditor() {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("global");
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO | null>(null);
  const [pageSEO, setPageSEO] = useState<SEOConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadPages();
    loadGlobalSEO();
  }, []);

  useEffect(() => {
    if (selectedPage === "global") {
      loadGlobalSEO();
    } else {
      loadPageSEO(selectedPage);
    }
  }, [selectedPage]);

  const loadPages = async () => {
    const pageList = await listPages();
    setPages(pageList);
  };

  const loadGlobalSEO = async () => {
    setIsLoading(true);
    try {
      const seo = await getGlobalSEO();
      setGlobalSEO(seo);
    } catch (error) {
      console.error("Error loading global SEO:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPageSEO = async (pageId: string) => {
    setIsLoading(true);
    try {
      const seo = await getPageSEO(pageId);
      if (seo) {
        setPageSEO(seo);
      } else {
        setPageSEO({ pageId });
      }
    } catch (error) {
      console.error("Error loading page SEO:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveGlobal = async () => {
    if (!globalSEO) return;

    setIsSaving(true);
    setMessage(null);

    const result = await saveGlobalSEO(globalSEO);

    if (result.success) {
      setMessage({ type: "success", text: "Global SEO settings saved!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save" });
    }

    setIsSaving(false);
  };

  const handleSavePage = async () => {
    if (!pageSEO || !selectedPage || selectedPage === "global") return;

    setIsSaving(true);
    setMessage(null);

    const result = await savePageSEO(selectedPage, pageSEO);

    if (result.success) {
      setMessage({ type: "success", text: "Page SEO settings saved!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save" });
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-300">Loading SEO settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-50">SEO Settings</h1>
        <p className="mt-2 text-sm text-slate-400">Configure SEO for pages and global settings</p>
      </div>

      {/* Page Selector */}
      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-4 shadow-orca-depth-2">
        <label htmlFor="page-select" className="mb-2 block text-sm font-medium text-slate-300">
          Select Page
        </label>
        <select
          id="page-select"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
        >
          <option value="global">Global Settings</option>
          {pages.map((page) => (
            <option key={page} value={page}>
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Global SEO Editor */}
      {selectedPage === "global" && globalSEO && (
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2 space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Global SEO Settings</h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Site Name</label>
            <input
              type="text"
              value={globalSEO.siteName}
              onChange={(e) => setGlobalSEO({ ...globalSEO, siteName: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Default Title</label>
            <input
              type="text"
              value={globalSEO.defaultTitle}
              onChange={(e) => setGlobalSEO({ ...globalSEO, defaultTitle: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Default Description</label>
            <textarea
              value={globalSEO.defaultDescription}
              onChange={(e) => setGlobalSEO({ ...globalSEO, defaultDescription: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Default OG Image URL</label>
            <input
              type="text"
              value={globalSEO.defaultImage}
              onChange={(e) => setGlobalSEO({ ...globalSEO, defaultImage: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Twitter Handle</label>
            <input
              type="text"
              value={globalSEO.twitterHandle || ""}
              onChange={(e) => setGlobalSEO({ ...globalSEO, twitterHandle: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              placeholder="@orcaaudit"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Google Analytics ID</label>
            <input
              type="text"
              value={globalSEO.googleAnalyticsId || ""}
              onChange={(e) => setGlobalSEO({ ...globalSEO, googleAnalyticsId: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveGlobal}
              disabled={isSaving}
              className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Global Settings"}
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
      )}

      {/* Page SEO Editor */}
      {selectedPage !== "global" && pageSEO && (
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2 space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">
            SEO Settings: {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
          </h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Page Title</label>
            <input
              type="text"
              value={pageSEO.title || ""}
              onChange={(e) => setPageSEO({ ...pageSEO, title: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Leave empty to use default"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Meta Description</label>
            <textarea
              value={pageSEO.description || ""}
              onChange={(e) => setPageSEO({ ...pageSEO, description: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              rows={3}
              placeholder="Leave empty to use default"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">OpenGraph Title</label>
            <input
              type="text"
              value={pageSEO.ogTitle || ""}
              onChange={(e) => setPageSEO({ ...pageSEO, ogTitle: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">OpenGraph Description</label>
            <textarea
              value={pageSEO.ogDescription || ""}
              onChange={(e) => setPageSEO({ ...pageSEO, ogDescription: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">OpenGraph Image URL</label>
            <input
              type="text"
              value={pageSEO.ogImage || ""}
              onChange={(e) => setPageSEO({ ...pageSEO, ogImage: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Canonical URL</label>
            <input
              type="text"
              value={pageSEO.canonical || ""}
              onChange={(e) => setPageSEO({ ...pageSEO, canonical: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Structured Data (JSON-LD)
            </label>
            <textarea
              value={pageSEO.schema ? JSON.stringify(pageSEO.schema, null, 2) : ""}
              onChange={(e) => {
                try {
                  const parsed = e.target.value ? JSON.parse(e.target.value) : undefined;
                  setPageSEO({ ...pageSEO, schema: parsed });
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 font-mono text-sm text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              rows={10}
              placeholder='{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "...",\n  "description": "..."\n}'
            />
            <p className="mt-2 text-xs text-slate-400">
              Enter valid JSON-LD structured data. This will be injected as a script tag in the page head.
              Leave empty to use default organization schema.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSavePage}
              disabled={isSaving}
              className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Page Settings"}
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
      )}
    </div>
  );
}
