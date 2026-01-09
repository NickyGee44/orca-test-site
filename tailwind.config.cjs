/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orca: {
          background: "#020617",
          panel: "#020617cc",
          primary: "#22d3ee",
          secondary: "#a855f7",
          accent: "#38bdf8"
        }
      },
      borderRadius: {
        panel: "24px",
        tile: "18px",
        button: "999px"
      },
      boxShadow: {
        "orca-panel": "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "orca-glow-cyan": "0 0 20px rgba(34, 211, 238, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(34, 211, 238, 0.2)",
        "orca-glow-purple": "0 0 20px rgba(168, 85, 247, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(168, 85, 247, 0.2)",
        "orca-depth-1": "0 2px 8px rgba(0, 0, 0, 0.2)",
        "orca-depth-2": "0 4px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
        "orca-depth-3": "0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)"
      }
    }
  },
  plugins: []
};


