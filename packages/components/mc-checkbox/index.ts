import _McCheckbox from "./mc-checkbox.vue";
import _McCheckboxGroup from "./mc-checkbox-group.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McCheckbox = withInstall(_McCheckbox);
export const McCheckboxGroup = withInstall(_McCheckboxGroup);
