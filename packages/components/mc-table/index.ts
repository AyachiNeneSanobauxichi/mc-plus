/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 09:36:30
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-27 10:25:58
 */
import _McTable from "./mc-table.vue";

import { withInstall } from "@mc-plus/utils";
export const McTable = withInstall(_McTable);

// export { McTable };
// export default McTable;

export * from "./composables/usePagination";
export * from "./composables/useTableScroll";
export * from "./composables/useTableSort";
export * from "./types";
