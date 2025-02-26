import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: env.API_DOMAIN_URL,
//         changeOrigin: true,
//         secure: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), "VITE_APP_");
  return {
    plugins: [react()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    server: {
      proxy: {
        "/api": {
          target: viteEnv.API_DOMAIN_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
