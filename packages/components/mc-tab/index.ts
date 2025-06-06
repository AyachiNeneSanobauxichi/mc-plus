import _McTab from "./mc-tab.vue";
import _McTabItem from "./mc-tab-item.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McTab = withInstall(_McTab);
export const McTabItem = withInstall(_McTabItem);
