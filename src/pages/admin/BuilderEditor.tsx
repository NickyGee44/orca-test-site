/**
 * Builder.io Editor Access Page
 * Provides links and instructions for accessing Builder.io visual editor
 */

import { builder, BUILDER_MODEL } from "../../services/builderService";
import { exportPageContent, exportAllPages, downloadPageExport } from "../../utils/exportToBuilder";
import { useState } from "react";

export function BuilderEditor() {
  const builderUrl = `https://builder.io/content/${BUILDER_MODEL}`;
  const builderEditorUrl = `https://builder.io/editor/${BUILDER_MODEL}`;
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExportPage = async (pageId: string) => {
    setExporting(pageId);
    try {
      const content = await exportPageContent(pageId);
      downloadPageExport(pageId, content);
    } catch (error) {
      console.error("Export failed:", error);
      alert(`Failed to export ${pageId}. Check console for details.`);
    } finally {
      setExporting(null);
    }
  };

  const handleExportAll = async () => {
    setExporting("all");
    try {
      const exports = await exportAllPages();
      const allContent = JSON.stringify(exports, null, 2);
      const blob = new Blob([allContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `all-pages-builder-export.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export pages. Check console for details.");
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-50">Builder.io Visual Editor</h1>
        <p className="mt-2 text-sm text-slate-400">
          Use Builder.io to visually create and edit pages without writing code
        </p>
      </div>

      {/* Quick Access */}
      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">Quick Access</h2>
        <div className="space-y-4">
          <div>
            <a
              href={builderEditorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-button bg-orca-primary px-6 py-3 text-white transition hover:bg-orca-accent"
            >
              Open Builder.io Editor
            </a>
            <p className="mt-2 text-sm text-slate-400">
              Opens the visual editor in a new tab. Create and edit pages visually.
            </p>
          </div>
          <div>
            <a
              href={builderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-button border border-slate-600 bg-transparent px-6 py-3 text-slate-300 transition hover:border-cyan-400/50 hover:text-slate-50"
            >
              View All Pages in Builder.io
            </a>
            <p className="mt-2 text-sm text-slate-400">
              View and manage all your Builder.io pages.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">How It Works</h2>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h3 className="mb-2 font-semibold text-slate-50">1. Create Pages Visually</h3>
            <p>
              Use Builder.io's drag-and-drop editor to create pages. No coding required. Add sections, images, text, buttons, and more.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-slate-50">2. Set Page URLs</h3>
            <p>
              When creating a page in Builder.io, set the URL path (e.g., "/custom-page" or "/landing"). This determines where the page appears on your site.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-slate-50">3. Publish & View</h3>
            <p>
              Once published in Builder.io, your page will automatically appear on your site at the URL you specified. Visit <code className="rounded bg-slate-800 px-2 py-1 text-cyan-400">/builder/[your-page-url]</code> to view it.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-slate-50">4. Integration</h3>
            <p>
              Builder.io pages are integrated into your React site. They work alongside your existing pages and can use your site's styling and components.
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">Tips</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start">
            <span className="mr-2 text-cyan-400">•</span>
            <span>Pages created in Builder.io are accessible at <code className="rounded bg-slate-800 px-2 py-1 text-cyan-400">/builder/[url-path]</code></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-cyan-400">•</span>
            <span>You can preview pages in Builder.io before publishing</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-cyan-400">•</span>
            <span>Builder.io pages can include custom code and components if needed</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-cyan-400">•</span>
            <span>Changes are saved automatically in Builder.io's cloud</span>
          </li>
        </ul>
      </div>

      {/* Export Existing Pages */}
      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">Export Existing Pages</h2>
        <p className="mb-4 text-sm text-slate-300">
          Export your current page content as JSON to use as reference when recreating pages in Builder.io. This includes all your current content structure.
        </p>
        <div className="space-y-3">
          <button
            onClick={handleExportAll}
            disabled={exporting === "all"}
            className="w-full rounded-button bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600 disabled:opacity-50"
          >
            {exporting === "all" ? "Exporting..." : "Export All Pages"}
          </button>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["homepage", "solutions", "product", "ai", "results", "about", "resources", "contact"].map((pageId) => (
              <button
                key={pageId}
                onClick={() => handleExportPage(pageId)}
                disabled={exporting === pageId}
                className="rounded-button border border-slate-600 bg-transparent px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400/50 hover:text-slate-50 disabled:opacity-50"
              >
                {exporting === pageId ? "..." : pageId}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">
            The exported JSON files contain your page structure and content. Use them as reference when building pages in Builder.io.
          </p>
        </div>
      </div>

      {/* API Key Info */}
      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">Configuration</h2>
        <div className="space-y-2 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-slate-50">API Key:</span> Configured and ready to use
          </p>
          <p>
            <span className="font-semibold text-slate-50">Model:</span> {BUILDER_MODEL}
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Your Builder.io API key is configured in the codebase. Pages created in Builder.io will automatically sync to your site.
          </p>
        </div>
      </div>
    </div>
  );
}
