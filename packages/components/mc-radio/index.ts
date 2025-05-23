import { withInstall } from "@mc-plus/utils";
import _McRadioGroup from "./mc-radio-group.vue";
import _McRadio from "./mc-radio.vue";

export * from "./types";
export const McRadio = withInstall(_McRadio);
export const McRadioGroup = withInstall(_McRadioGroup);
