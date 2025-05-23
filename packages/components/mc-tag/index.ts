import { withInstall } from "@mc-plus/utils";
import _McTag from "./mc-tag.vue";

export * from "./types";
export const McTag = withInstall(_McTag);
export default McTag;
