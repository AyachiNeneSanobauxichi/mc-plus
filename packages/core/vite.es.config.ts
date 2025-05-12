import { defineConfig, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { includes } from "lodash-es";
import { resolve } from "path";
import { getDirectoriesSync } from "../utils/build";

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
          if (
            includes(id, "plugin-vue:export-helper") ||
            includes(id, "/packages/utils")
          ) {
            return "utils";
          }
          if (includes(id, "node_modules")) {
            return "vendor";
          }
          if (includes(id, "/packages/hooks")) {
            return "hooks";
          }
          for (const comp of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${comp}`)) {
              return comp;
            }
          }
        },
      },
    },
  },
});
