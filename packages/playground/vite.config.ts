import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    build: {
      sourcemap: true,
    },
    server: {
      host: "0.0.0.0",
      port: Number(env["VITE_APP_PORT"]),
      open: false,
      strictPort: true,
      hmr: true,
      proxy: {
        "/prod-api": {
          changeOrigin: true,
          target: env["VITE_APP_API_URL"],
        },
      },
    },
  };
});
