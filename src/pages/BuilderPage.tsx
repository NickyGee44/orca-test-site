/**
 * Builder.io page component
 * Renders Builder.io content visually
 */

import { builder, BUILDER_MODEL } from "../services/builderService";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function BuilderPage() {
  const params = useParams<{ "*": string }>();
  const isPreviewing = useIsPreviewing();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        setError(null);

        // Build the URL for the page - get path from params or use location
        const pathParam = params["*"] || "";
        // Builder.io URLs should not start with /builder, just the path after it
        const urlPath = pathParam ? `/${pathParam}` : "/builder";

        // Fetch content from Builder.io
        const builderContent = await builder
          .get(BUILDER_MODEL, {
            url: urlPath,
            // Enable preview mode if in Builder.io editor
            ...(isPreviewing ? { preview: true } : {}),
          })
          .promise();

        setContent(builderContent);
      } catch (err: any) {
        console.error("Error loading Builder.io content:", err);
        setError(err.message || "Failed to load page content");
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [params, isPreviewing]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orca-background">
        <div className="text-slate-300">Loading page...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orca-background">
        <div className="rounded-panel glass-panel p-8 text-center">
          <h2 className="mb-4 text-xl font-semibold text-slate-50">Error Loading Page</h2>
          <p className="text-slate-300">{error}</p>
          <p className="mt-4 text-sm text-slate-400">
            This page hasn't been created in Builder.io yet.{" "}
            <a
              href={`https://builder.io/content/${BUILDER_MODEL}?url=${encodeURIComponent(params["*"] ? `/${params["*"]}` : "/")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orca-primary hover:text-orca-accent"
            >
              Create it now
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orca-background">
        <div className="rounded-panel glass-panel p-8 text-center">
          <h2 className="mb-4 text-xl font-semibold text-slate-50">Page Not Found</h2>
          <p className="text-slate-300">This page hasn't been created in Builder.io yet.</p>
          <a
            href={`https://builder.io/content/${BUILDER_MODEL}?url=${encodeURIComponent(params["*"] ? `/${params["*"]}` : "/")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-button bg-orca-primary px-6 py-2 text-white hover:bg-orca-accent"
          >
            Create Page in Builder.io
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="builder-page">
      <BuilderComponent model={BUILDER_MODEL} content={content} />
    </div>
  );
}
