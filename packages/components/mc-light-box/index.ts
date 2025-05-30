/*
 * @Author: Tieju yang
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-01-27 10:00:00
 */
import { withInstall } from "@mc-plus/utils";
import { createLightbox } from "./lightbox";
import _McLightBox from "./mc-light-box.vue";

export * from "./lightbox";
export * from "./types";

export const McLightBox = withInstall(_McLightBox);

// Default export for the lightbox function to be used globally
export default {
  install: (app: any) => {
    app.config.globalProperties.$lightbox = createLightbox;
  },
};
