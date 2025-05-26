/*
 * @Author: Tieju yang
 * @Date: 2025-05-21 09:34:14
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-21 09:55:00
 */
import { withInstall } from "@mc-plus/utils";
import _McToast from "./mc-toast.vue";
import { createToast } from "./toast";

export * from "./toast";
export * from "./types";
export const McToast = withInstall(_McToast);

// Default export for the toast function to be used globally
export default {
  install: (app: any) => {
    app.config.globalProperties.$toast = createToast;
  },
};
