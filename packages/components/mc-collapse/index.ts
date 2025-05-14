import _McCollapse from "./mc-collapse.vue";
import _McCollapseItem from "./mc-collapse-item.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McCollapse = withInstall(_McCollapse);
export const McCollapseItem = withInstall(_McCollapseItem);
