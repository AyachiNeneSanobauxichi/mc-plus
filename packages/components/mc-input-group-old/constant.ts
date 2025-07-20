import type { InjectionKey } from "vue";
import type { InputGroupContext } from "./types";

export const INPUT_GROUP_INJECTION_KEY: InjectionKey<InputGroupContext> =
  Symbol("InputGroupContext");
