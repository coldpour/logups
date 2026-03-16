import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), "");

  return {
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.js$/,
      exclude: [],
    },
    plugins: [
      react({ include: /\.[jt]sx?$/ }),
    ].filter(Boolean),
    resolve: {
      alias: [
        {
          find: /^@clerk\/shared\/react$/,
          replacement: fileURLToPath(
            new URL("./src/vendor/clerk-shared-react-shim.mjs", import.meta.url),
          ),
        },
        {
          find: /^@clerk\/shared\/loadClerkJsScript$/,
          replacement: fileURLToPath(
            new URL(
              "./src/vendor/clerk-load-script-shim.mjs",
              import.meta.url,
            ),
          ),
        },
      ],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.js",
    },
  };
});
