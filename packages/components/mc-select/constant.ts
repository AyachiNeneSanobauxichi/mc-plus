import type { InjectionKey } from "vue";
import type { SelectContext, SelectGroupContext } from "./types";

export const SELECT_INJECTION_KEY: InjectionKey<SelectContext> =
  Symbol("selectContext");

export const SELECT_GROUP_INJECTION_KEY: InjectionKey<SelectGroupContext> =
  Symbol("selectGroupContext");
