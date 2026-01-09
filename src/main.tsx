import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import "./index.css";
// Initialize Builder.io and register custom components (optional, won't break app if it fails)
try {
  import("./services/builderService").catch((err) => {
    console.warn("Builder.io not available:", err);
  });
} catch (error) {
  console.warn("Failed to load Builder.io:", error);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


