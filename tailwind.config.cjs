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
      // Increased font sizes for better readability per feedback
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.25rem' }],    // 13px (was 12px)
        'sm': ['0.9375rem', { lineHeight: '1.375rem' }],   // 15px (was 14px)
        'base': ['1.0625rem', { lineHeight: '1.625rem' }], // 17px (was 16px)
        'lg': ['1.1875rem', { lineHeight: '1.75rem' }],    // 19px (was 18px)
        'xl': ['1.375rem', { lineHeight: '1.875rem' }],    // 22px (was 20px)
        '2xl': ['1.625rem', { lineHeight: '2rem' }],       // 26px (was 24px)
        '3xl': ['2rem', { lineHeight: '2.375rem' }],       // 32px (was 30px)
        '4xl': ['2.5rem', { lineHeight: '2.75rem' }],      // 40px (was 36px)
        '5xl': ['3.25rem', { lineHeight: '1' }],           // 52px (was 48px)
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


