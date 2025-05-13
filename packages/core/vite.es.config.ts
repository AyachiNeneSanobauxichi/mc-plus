import { defineConfig, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { delay, includes } from "lodash-es";
import { resolve } from "path";
import { getDirectoriesSync } from "../utils/build";
import { readFileSync } from "fs";
import shell from "shelljs";
import terser from "@rollup/plugin-terser";
import hooks from "./hooksPlugin";

const TRY_MOCE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyles() {
  try {
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (error) {
    delay(moveStyles, TRY_MOCE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }) as PluginOption,
    hooks({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: () => {
        moveStyles();
      },
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@PROD": JSON.stringify(isProd),
          "@DEV": JSON.stringify(isDev),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    minify: false,
    // sourcemap: true,
    outDir: "dist/es",
    cssCodeSplit: true,
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
