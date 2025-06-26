import type { InjectionKey } from "vue";
import type { SelectContext } from "./types";

export const SELECT_INJECTION_KEY: InjectionKey<SelectContext> =
  Symbol("selectContext");
