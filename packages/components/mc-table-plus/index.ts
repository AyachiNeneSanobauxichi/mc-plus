import _McTablePlus from "./mc-table-plus.vue";
import _McTableColumnPlus from "./mc-table-column.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McTablePlus = withInstall(_McTablePlus);
export const McTableColumnPlus = withInstall(_McTableColumnPlus);
