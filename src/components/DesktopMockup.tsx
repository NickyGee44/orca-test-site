/**
 * Desktop monitor mockup component that displays an image on a desktop screen
 */

interface DesktopMockupProps {
  imageUrl?: string;
  alt?: string;
  className?: string;
}

export function DesktopMockup({ imageUrl, alt = "Desktop screen", className = "" }: DesktopMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Desktop Monitor Container */}
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Monitor Stand */}
        <div className="mx-auto mb-2 h-8 w-32 rounded-b-lg bg-slate-800 shadow-lg" />
        <div className="mx-auto mb-4 h-1 w-40 rounded-full bg-slate-700" />
        
        {/* Monitor Screen */}
        <div className="relative rounded-lg border-8 border-slate-800 bg-slate-900 shadow-2xl">
          {/* Screen Bezel */}
          <div className="relative overflow-hidden rounded-t-lg bg-slate-950">
            {/* Screen Content Area */}
            <div className="relative aspect-video w-full bg-slate-900">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="text-center text-slate-500">
                    <div className="mb-2 text-4xl">🖥️</div>
                    <div className="text-sm">No image selected</div>
                  </div>
                </div>
              )}
            </div>
            {/* Screen Reflection/Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Monitor Bottom Bezel */}
          <div className="h-3 bg-slate-800" />
          <div className="h-1 rounded-b-lg bg-slate-700" />
        </div>
        
        {/* Optional: Screen Glow Effect */}
        {imageUrl && (
          <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-2xl opacity-50 pointer-events-none" />
        )}
      </div>
    </div>
  );
}
