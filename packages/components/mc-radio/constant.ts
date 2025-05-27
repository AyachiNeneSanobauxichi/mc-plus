import type { InjectionKey } from "vue";
import type { RadioGroupContext } from "./types";

export const RADIO_INJECTION_KEY: InjectionKey<RadioGroupContext> =
  Symbol("selectContext");
