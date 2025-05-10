import { defineConfig, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

const COMP_NAMES = ["mc-button", "mc-icon"] as const;

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }) as PluginOption,
  ],
  build: {
    // minify: false,
    // sourcemap: true,
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "McPlus",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "@popperjs/core", "async-validator"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
        manualChunks: (id) => {
          if (id.includes("plugin-vue:export-helper")) {
            return "main";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils")) {
            return "utils";
          }
          for (const comp of COMP_NAMES) {
            if (id.includes(`/packages/components/${comp}`)) {
              return comp;
            }
          }
        },
      },
    },
  },
});
