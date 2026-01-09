import { Link } from "react-router-dom";

export function AdminDashboard() {
  // Placeholder stats - will be replaced with real data later
  const stats = [
    { label: "Total Pages", value: "8", icon: "📄" },
    { label: "Articles", value: "12", icon: "📰" },
    { label: "Contact Submissions", value: "5", icon: "✉️" },
    { label: "Last Updated", value: "Today", icon: "🕒" }
  ];

  const quickActions = [
    { to: "/admin/pages", label: "Edit Pages", icon: "📝", description: "Update page content" },
    { to: "/admin/articles", label: "Manage Articles", icon: "📰", description: "Create and edit articles" },
    { to: "/admin/images", label: "Manage Images", icon: "🖼️", description: "Upload and manage images" },
    { to: "/admin/contact", label: "View Submissions", icon: "✉️", description: "Check contact form" },
    { to: "/admin/seo", label: "SEO Settings", icon: "🔍", description: "Configure SEO" },
    { to: "/admin/gtm", label: "Google Tag Manager", icon: "🏷️", description: "Configure GTM" },
    { to: "/admin/builder", label: "Builder.io Editor", icon: "🎨", description: "Visual page builder" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-50">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">Welcome to the Orca admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-4 shadow-orca-depth-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-50">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-50">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2 transition hover:border-cyan-400/30 hover:shadow-orca-glow-cyan"
            >
              <div className="mb-3 text-3xl">{action.icon}</div>
              <h3 className="mb-1 text-lg font-semibold text-slate-50">{action.label}</h3>
              <p className="text-sm text-slate-400">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-50">Recent Activity</h2>
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
          <p className="text-sm text-slate-400">No recent activity</p>
        </div>
      </div>
    </div>
  );
}
