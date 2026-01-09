import { useState, useEffect } from "react";
import { getPageContent, savePageContent, listPages } from "../../services/contentService";
import { getAllImages } from "../../services/imageService";
import { getDefaultContentForPage } from "../../services/pageDefaults";
import { PageSectionEditors } from "../../components/PageSectionEditors";
import type { PageContent } from "../../types/content";
import type { ImageAsset } from "../../services/imageService";

export function PagesEditor() {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [availableImages, setAvailableImages] = useState<ImageAsset[]>([]);

  useEffect(() => {
    loadPages();
    loadImages();
  }, []);

  const loadImages = () => {
    const images = getAllImages();
    setAvailableImages(images);
  };

  useEffect(() => {
    if (selectedPage) {
      loadPageContent(selectedPage);
    }
  }, [selectedPage]);

  const loadPages = async () => {
    const pageList = await listPages();
    setPages(pageList);
    if (pageList.length > 0 && !selectedPage) {
      setSelectedPage(pageList[0]);
    }
  };

  const loadPageContent = async (pageId: string) => {
    setIsLoading(true);
    try {
      const pageContent = await getPageContent(pageId);
      if (pageContent && Object.keys(pageContent.sections).length > 0) {
        setContent(pageContent);
      } else {
        // Initialize with default content for this page
        const defaultContent = getDefaultContentForPage(pageId);
        setContent({
          pageId,
          sections: defaultContent,
          lastModified: new Date().toISOString(),
          modifiedBy: "admin"
        });
      }
    } catch (error) {
      console.error("Error loading page content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content || !selectedPage) return;

    setIsSaving(true);
    setSaveMessage(null);

    const result = await savePageContent(selectedPage, content.sections);

    if (result.success) {
      setSaveMessage({ type: "success", text: "Content saved successfully!" });
      // Reload to get updated timestamp
      await loadPageContent(selectedPage);
      setTimeout(() => setSaveMessage(null), 3000);
    } else {
      setSaveMessage({ type: "error", text: result.error || "Failed to save content" });
    }

    setIsSaving(false);
  };

  const updateSection = (sectionKey: string, value: any) => {
    if (!content) return;
    setContent({
      ...content,
      sections: {
        ...content.sections,
        [sectionKey]: value
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-300">Loading page content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">Page Content Editor</h1>
          <p className="mt-2 text-sm text-slate-400">Edit content for marketing pages</p>
        </div>
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
          {pages.map((page) => (
            <option key={page} value={page}>
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {content && (
        <>
          {/* Content Editor */}
          <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-50">
                Editing: {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
              </h2>
              {content.lastModified && (
                <span className="text-xs text-slate-400">
                  Last modified: {new Date(content.lastModified).toLocaleString()}
                </span>
              )}
            </div>

            <PageSectionEditors
              pageId={selectedPage}
              content={content}
              availableImages={availableImages}
              updateSection={updateSection}
            />

            {/* Save Button */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>

              {saveMessage && (
                <div
                  className={`rounded-md px-4 py-2 text-sm ${
                    saveMessage.type === "success"
                      ? "bg-green-500/10 text-green-300 border border-green-500/30"
                      : "bg-red-500/10 text-red-300 border border-red-500/30"
                  }`}
                >
                  {saveMessage.text}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
