import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const adminNavItems = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/pages", label: "Pages", icon: "📄" },
  { to: "/admin/articles", label: "Articles", icon: "📰" },
  { to: "/admin/images", label: "Images", icon: "🖼️" },
  { to: "/admin/contact", label: "Contact", icon: "✉️" },
  { to: "/admin/seo", label: "SEO", icon: "🔍" },
  { to: "/admin/gtm", label: "Google Tag Manager", icon: "🏷️" },
  { to: "/admin/builder", label: "Builder.io", icon: "🎨" },
  { to: "/admin/settings", label: "Settings", icon: "⚙️" }
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-orca-background text-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800/70 bg-orca-panel/40 backdrop-blur-xl">
          <div className="flex h-full flex-col">
            {/* Logo/Header */}
            <div className="border-b border-slate-800/70 p-4">
              <Link to="/admin" className="flex items-center gap-2">
                <div className="text-xl font-bold text-cyan-400">Orca Admin</div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30"
                        : "text-slate-300 hover:bg-slate-900/60 hover:text-slate-50"
                    ].join(" ")
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-800/70 p-4">
              <Link
                to="/"
                className="mb-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-900/60 hover:text-slate-50"
              >
                <span>←</span>
                <span>View Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-slate-50"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl p-6 sm:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
