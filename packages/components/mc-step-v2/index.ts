import _McStepV2 from "./mc-step-v2.vue";
import _McStepItemV2 from "./mc-step-item-v2.vue";
import _McStepChildItemV2 from "./mc-step-child-item-v2.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McStepV2 = withInstall(_McStepV2);
export const McStepItemV2 = withInstall(_McStepItemV2);
export const McStepChildItemV2 = withInstall(_McStepChildItemV2);
