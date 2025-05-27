import type { InjectionKey } from "vue";
import type { FormItemContext } from "./types";

export const FORM_ITEM_CONTEXT_KEY: InjectionKey<FormItemContext> =
  Symbol("FORM_ITEM_CONTEXT");
