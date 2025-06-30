import type { InjectionKey } from "vue";
import type { CheckboxGroupContext } from "./types";

export const CHECKBOX_GROUP_INJECTION_KEY: InjectionKey<CheckboxGroupContext> =
  Symbol("CheckboxGroupContext");
