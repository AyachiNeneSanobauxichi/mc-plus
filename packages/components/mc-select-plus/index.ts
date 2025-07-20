import _McSelectPlus from "./mc-select-plus.vue";
import _McSelectOptionPlus from "./mc-select-option-plus.vue";
import _McSelectGroupPlus from "./mc-select-group-plus.vue";
import _McSelectMultiOption from "./mc-select-multi-option.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McSelectPlus = withInstall(_McSelectPlus);
export const McSelectOptionPlus = withInstall(_McSelectOptionPlus);
export const McSelectGroupPlus = withInstall(_McSelectGroupPlus);
export const McSelectMultiOption = withInstall(_McSelectMultiOption);
