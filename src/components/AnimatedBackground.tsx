export function AnimatedBackground() {
  return (
    <>
      {/* Floating orbs with slow movement - Increased to 50% opacity */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Orb 1 - Cyan, top-left */}
        <div
          className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.5),_transparent_70%)] blur-3xl opacity-50 animate-float-orb-1 animate-breathe-orb"
          aria-hidden="true"
        />
        {/* Orb 2 - Purple, bottom-right */}
        <div
          className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.5),_transparent_70%)] blur-3xl opacity-50 animate-float-orb-2 animate-breathe-orb"
          style={{ animationDelay: "1s" }}
          aria-hidden="true"
        />
        {/* Orb 3 - Cyan-Purple blend, center-right */}
        <div
          className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.4),_rgba(168,85,247,0.4),_transparent_70%)] blur-3xl opacity-50 animate-float-orb-3 animate-breathe-orb"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        />
        {/* Orb 4 - Purple-Cyan blend, bottom-left */}
        <div
          className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.45),_rgba(34,211,238,0.35),_transparent_70%)] blur-3xl opacity-50 animate-float-orb-4 animate-breathe-orb"
          style={{ animationDelay: "0.5s" }}
          aria-hidden="true"
        />
        {/* Orb 5 - Additional orb for more movement */}
        <div
          className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.3),_rgba(168,85,247,0.3),_transparent_70%)] blur-3xl opacity-50 animate-float-orb-5 animate-breathe-orb"
          style={{ animationDelay: "1.5s" }}
          aria-hidden="true"
        />
      </div>

      {/* Neural network connections between orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <svg className="h-full w-full" style={{ opacity: 0.35 }}>
          {/* Connection 1: Orb 1 (top-left) to Orb 3 (center-right) */}
          <defs>
            <linearGradient id="signal-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.15)" stopOpacity="0.15" />
              <stop offset="45%" stopColor="rgba(34,211,238,0.4)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="rgba(34,211,238,0.65)" stopOpacity="0.65" />
              <stop offset="55%" stopColor="rgba(34,211,238,0.4)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.15)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="signal-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.15)" stopOpacity="0.15" />
              <stop offset="45%" stopColor="rgba(168,85,247,0.4)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="rgba(168,85,247,0.65)" stopOpacity="0.65" />
              <stop offset="55%" stopColor="rgba(168,85,247,0.4)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgba(34,211,238,0.15)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="signal-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.15)" stopOpacity="0.15" />
              <stop offset="45%" stopColor="rgba(34,211,238,0.35)" stopOpacity="0.35" />
              <stop offset="50%" stopColor="rgba(168,85,247,0.6)" stopOpacity="0.6" />
              <stop offset="55%" stopColor="rgba(168,85,247,0.35)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgba(34,211,238,0.15)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="signal-gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.15)" stopOpacity="0.15" />
              <stop offset="45%" stopColor="rgba(168,85,247,0.35)" stopOpacity="0.35" />
              <stop offset="50%" stopColor="rgba(34,211,238,0.6)" stopOpacity="0.6" />
              <stop offset="55%" stopColor="rgba(34,211,238,0.35)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.15)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          
          {/* Line 1: Orb 1 (top-left ~5%, 5%) to Orb 3 (center-right ~95%, 50%) */}
          <line
            x1="5%"
            y1="5%"
            x2="95%"
            y2="50%"
            stroke="url(#signal-gradient-1)"
            strokeWidth="2"
            strokeDasharray="1000"
            className="animate-signal-travel-1"
            style={{ filter: "blur(0.5px)" }}
          />
          
          {/* Line 2: Orb 2 (bottom-right ~95%, 95%) to Orb 4 (bottom-left ~25%, 95%) */}
          <line
            x1="95%"
            y1="95%"
            x2="25%"
            y2="95%"
            stroke="url(#signal-gradient-2)"
            strokeWidth="2"
            strokeDasharray="1000"
            className="animate-signal-travel-2"
            style={{ filter: "blur(0.5px)" }}
          />
          
          {/* Line 3: Orb 3 (center-right ~95%, 50%) to Orb 5 (top-center ~33%, 5%) */}
          <line
            x1="95%"
            y1="50%"
            x2="33%"
            y2="5%"
            stroke="url(#signal-gradient-3)"
            strokeWidth="2"
            strokeDasharray="1000"
            className="animate-signal-travel-3"
            style={{ filter: "blur(0.5px)" }}
          />
          
          {/* Line 4: Orb 1 (top-left ~5%, 5%) to Orb 4 (bottom-left ~25%, 95%) */}
          <line
            x1="5%"
            y1="5%"
            x2="25%"
            y2="95%"
            stroke="url(#signal-gradient-4)"
            strokeWidth="2"
            strokeDasharray="1000"
            className="animate-signal-travel-4"
            style={{ filter: "blur(0.5px)" }}
          />

          {/* Synapse nodes along connections - using g for transform */}
          <g>
            {/* Nodes on line 1 */}
            <circle cx="30%" cy="20%" r="3" fill="rgba(34,211,238,0.5)" className="animate-pulse-synapse" style={{ animationDelay: "0s", transformOrigin: "30% 20%" }} />
            <circle cx="60%" cy="32.5%" r="3" fill="rgba(168,85,247,0.5)" className="animate-pulse-synapse" style={{ animationDelay: "1s", transformOrigin: "60% 32.5%" }} />
            
            {/* Nodes on line 2 */}
            <circle cx="60%" cy="95%" r="3" fill="rgba(168,85,247,0.5)" className="animate-pulse-synapse" style={{ animationDelay: "0.5s", transformOrigin: "60% 95%" }} />
            
            {/* Nodes on line 3 */}
            <circle cx="64%" cy="27.5%" r="3" fill="rgba(34,211,238,0.5)" className="animate-pulse-synapse" style={{ animationDelay: "1.5s", transformOrigin: "64% 27.5%" }} />
            
            {/* Nodes on line 4 */}
            <circle cx="15%" cy="50%" r="3" fill="rgba(168,85,247,0.5)" className="animate-pulse-synapse" style={{ animationDelay: "0.75s", transformOrigin: "15% 50%" }} />
          </g>
        </svg>
      </div>

      {/* Data stream particles - Increased visibility */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50 animate-data-stream"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + (i % 10)}s`
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Enhanced mesh gradient overlay */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.3),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.28),_transparent_55%)] opacity-100"
        aria-hidden="true"
      />
    </>
  );
}

