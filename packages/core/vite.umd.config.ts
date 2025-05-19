import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { compression } from "vite-plugin-compression2";
import { resolve } from "path";
import terser from "@rollup/plugin-terser";
import { removeDistPlugin, moveStyles, ENV } from "../utils/build";

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    removeDistPlugin({
      rmFiles: ["./dist/umd", "./dist/index.css"],
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
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "McPlus",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});
