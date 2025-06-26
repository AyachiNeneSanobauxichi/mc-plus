import type { InjectionKey } from "vue";
import type { StepV2Context } from "./types";

export const STEP_V2_INJECTION_KEY: InjectionKey<StepV2Context> =
  Symbol("StepV2Context");
