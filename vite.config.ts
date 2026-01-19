import { defineConfig } from "vite";

export default defineConfig(async () => {
  const reactPlugin = (await import("@vitejs/plugin-react-swc")).default;
  return {
    plugins: [reactPlugin()],
    server: {
      port: 5173
    }
  };
});


