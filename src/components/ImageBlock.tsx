/**
 * Reusable image block component with consistent styling
 * Supports full-width, contained, and side-by-side layouts
 */

import type { ImageSection } from "../types/content";

interface ImageBlockProps extends ImageSection {
  className?: string;
  overlay?: boolean;
  trustBullets?: string[];
}

export function ImageBlock({
  imageUrl,
  alt = "Image",
  caption,
  layout = "contained",
  className = "",
  overlay = true,
  trustBullets
}: ImageBlockProps) {
  if (!imageUrl) return null;

  const baseClasses = "relative overflow-hidden rounded-panel border border-slate-800/70";
  const layoutClasses = {
    "full-width": "w-full",
    contained: "mx-auto max-w-6xl",
    "side-by-side": "w-full"
  };

  return (
    <div className={`${baseClasses} ${layoutClasses[layout]} ${className}`}>
      <div className="relative">
        <img
          src={imageUrl}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Hide broken images gracefully
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-slate-950/40 to-transparent" />
        )}
        {trustBullets && trustBullets.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-end p-6">
            <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-4 shadow-orca-depth-2 max-w-sm">
              <ul className="space-y-2 text-xs text-slate-300">
                {trustBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 text-cyan-400">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-center text-xs text-slate-400">{caption}</p>
      )}
    </div>
  );
}
