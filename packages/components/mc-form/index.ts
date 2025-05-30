import _McForm from "./mc-form.vue";
import _McFormItem from "./mc-form-item.vue";
import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McForm = withInstall(_McForm);
export const McFormItem = withInstall(_McFormItem);
