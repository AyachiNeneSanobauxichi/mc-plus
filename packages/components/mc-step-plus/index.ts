import _McStepPlus from "./mc-step-plus.vue";
import _McStepItemPlus from "./mc-step-item-plus.vue";
import _McStepChildItemPlus from "./mc-step-child-item-plus.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McStepPlus = withInstall(_McStepPlus);
export const McStepItemPlus = withInstall(_McStepItemPlus);
export const McStepChildItemPlus = withInstall(_McStepChildItemPlus);
