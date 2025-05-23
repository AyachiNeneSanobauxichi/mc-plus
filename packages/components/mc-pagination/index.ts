/*
 * @Author: Tieju yang
 * @Date: 2025-05-23 10:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-23 10:00:00
 */
import type { App } from "vue";
import "./index.scss";
import MCPagination from "./mc-pagination.vue";

// Named export
export { MCPagination };

// Default export
export default {
  install(app: App) {
    app.component("MCPagination", MCPagination);
  },
};
