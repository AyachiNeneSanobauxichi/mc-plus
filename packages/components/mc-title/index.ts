import _McTitleToolBar from "./mc-title-tool-bar.vue";
import _McTitle from "./mc-title.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McTitleToolBar = withInstall(_McTitleToolBar);
export const McTitle = withInstall(_McTitle);
