import type { ReactNode } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoUrl from "/orca-logo.png";
import { AnimatedBackground } from "../components/AnimatedBackground";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/product", label: "Platform" },
  { to: "/ai", label: "AI & Data" },
  { to: "/results", label: "Results" },
  { to: "/resources", label: "News" },
  { to: "/about", label: "About" }
];

export function MarketingLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-orca-background text-slate-50">
      <AnimatedBackground />
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-orca-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Orca logo"
                className="h-8 w-auto object-contain"
                style={{ maxHeight: '32px' }}
                loading="lazy"
              />
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "transition-colors hover:text-slate-50",
                      isActive ? "text-slate-50" : "text-slate-300"
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-200 hover:border-slate-500 hover:text-slate-50 md:hidden"
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen((open) => !open)}
              >
                <span className="sr-only">Toggle navigation</span>
                <div className="space-y-1">
                  <span className="block h-0.5 w-4 rounded-full bg-current" />
                  <span className="block h-0.5 w-4 rounded-full bg-current" />
                </div>
              </button>
              <span className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-cyan-200 shadow-orca-glow-cyan md:inline-flex">
                Celebrating 10 years
              </span>
              <Link
                to="/contact"
                className="hidden rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple sm:inline-flex"
              >
                Book a demo
              </Link>
            </div>
          </div>
          {mobileOpen ? (
            <div className="border-t border-slate-800/70 bg-orca-background/95 px-4 pb-4 pt-2 md:hidden">
              <nav className="flex flex-col gap-2 text-sm text-slate-300">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      [
                        "rounded-md px-2 py-2 transition-colors",
                        isActive
                          ? "bg-slate-900 text-slate-50"
                          : "hover:bg-slate-900/60 hover:text-slate-50"
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center justify-center rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-orca-glow-cyan"
                >
                  Book a demo
                </Link>
              </nav>
            </div>
          ) : null}
        </header>
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <footer className="mt-8 border-t border-slate-800/70 bg-orca-background/80">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <span>© {new Date().getFullYear()} Orca. All rights reserved.</span>
              <span className="text-[11px] text-slate-500">
                10 years of freight audit innovation, now powered by AI.
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="hover:text-slate-200">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-slate-200">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


