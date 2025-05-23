/*
 * @Author: Tieju yang
 * @Date: 2025-05-21 14:09:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 17:15:04
 */
import { withInstall } from "@mc-plus/utils";
import _McTable from "./mc-table.vue";

export const McTable = withInstall(_McTable);
export default McTable;

export * from "./types";
