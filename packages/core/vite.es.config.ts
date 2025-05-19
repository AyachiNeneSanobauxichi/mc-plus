import { defineConfig, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { includes } from "lodash-es";
import { resolve } from "path";
import {
  getDirectoriesSync,
  removeDistPlugin,
  moveStyles,
  ENV,
} from "../utils/build";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }) as PluginOption,
    removeDistPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: () => {
        moveStyles();
      },
    }),
    terser({
      compress: {
        sequences: ENV.isProd,
        arguments: ENV.isProd,
        drop_console: ENV.isProd && ["log"],
        drop_debugger: ENV.isProd,
        passes: ENV.isProd ? 4 : 1,
        global_defs: {
          "@PROD": JSON.stringify(ENV.isProd),
          "@DEV": JSON.stringify(ENV.isDev),
          "@TEST": JSON.stringify(ENV.isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: ENV.isProd,
        braces: !ENV.isProd,
        beautify: !ENV.isProd,
        comments: !ENV.isProd,
      },
      mangle: {
        toplevel: ENV.isProd,
        eval: ENV.isProd,
        keep_classnames: ENV.isDev,
        keep_fnames: ENV.isDev,
      },
    }),
  ],
  build: {
    minify: false,
    sourcemap: !ENV.isProd,
    outDir: "dist/es",
    cssCodeSplit: true,
    cssMinify: ENV.isProd,
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
          if (assetInfo.name === "style.css") {
            return "index.css";
          }
          if (
            assetInfo.type === "asset" &&
            /\.css$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }

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
