import { useState, useEffect } from "react";
import { getGTMConfig, saveGTMConfig, type GTMConfig } from "../../services/gtmService";

export function GTMEditor() {
  const [config, setConfig] = useState<GTMConfig>({ containerId: "", enabled: false });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const loadedConfig = getGTMConfig();
    setConfig(loadedConfig);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    // Validate container ID format (GTM-XXXXXXX)
    if (config.containerId && !/^GTM-[A-Z0-9]+$/i.test(config.containerId)) {
      setMessage({ type: "error", text: "Invalid GTM container ID format. Should be GTM-XXXXXXX" });
      setIsSaving(false);
      return;
    }

    const result = saveGTMConfig(config);

    if (result.success) {
      setMessage({ type: "success", text: "GTM configuration saved! The page will reload to apply changes." });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save GTM configuration" });
    }

    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-50">Google Tag Manager</h1>
        <p className="mt-2 text-sm text-slate-400">Configure Google Tag Manager for your site</p>
      </div>

      <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            GTM Container ID
          </label>
          <input
            type="text"
            value={config.containerId}
            onChange={(e) => setConfig({ ...config, containerId: e.target.value.toUpperCase() })}
            placeholder="GTM-XXXXXXX"
            className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
          />
          <p className="mt-2 text-xs text-slate-400">
            Enter your Google Tag Manager container ID (e.g., GTM-XXXXXXX). You can find this in your GTM account.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="gtm-enabled"
            checked={config.enabled}
            onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900/70 text-cyan-400 focus:ring-cyan-400/20"
          />
          <label htmlFor="gtm-enabled" className="text-sm text-slate-300">
            Enable Google Tag Manager
          </label>
        </div>

        {config.enabled && config.containerId && (
          <div className="rounded-tile border border-cyan-400/20 bg-cyan-400/5 p-4">
            <h3 className="mb-2 text-sm font-semibold text-cyan-200">Preview</h3>
            <p className="mb-2 text-xs text-slate-300">
              The following scripts will be injected into your site:
            </p>
            <div className="space-y-2 font-mono text-[10px] text-slate-400">
              <div>
                <strong className="text-slate-300">Head:</strong>
                <pre className="mt-1 overflow-x-auto">
{`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${config.containerId}');</script>
<!-- End Google Tag Manager -->`}
                </pre>
              </div>
              <div>
                <strong className="text-slate-300">Body:</strong>
                <pre className="mt-1 overflow-x-auto">
{`<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config.containerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`}
                </pre>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save GTM Configuration"}
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
    </div>
  );
}
