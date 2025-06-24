import _McStatus from "./mc-status.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McStatus = withInstall(_McStatus);
