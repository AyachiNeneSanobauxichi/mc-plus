import _McRadioGroup from "./mc-radio-group.vue";
import _McRadio from "./mc-radio.vue";

import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McRadioGroup = withInstall(_McRadioGroup);
export const McRadio = withInstall(_McRadio);
