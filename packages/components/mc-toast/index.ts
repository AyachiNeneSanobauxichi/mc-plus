import _McToast from "./mc-toast.vue";

import { withInstall } from "@mc-plus/utils";

export * from "./types";
export * from "./toast";
export const McToast = withInstall(_McToast);
