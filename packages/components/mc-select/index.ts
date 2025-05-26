import _McSelect from "./mc-select.vue";
import _McSelectOption from "./mc-select-option.vue";
import _McSelectGroup from "./mc-select-group.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McSelect = withInstall(_McSelect);
export const McSelectOption = withInstall(_McSelectOption);
export const McSelectGroup = withInstall(_McSelectGroup);
