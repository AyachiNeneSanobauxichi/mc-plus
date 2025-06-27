import type { InjectionKey } from "vue";
import type { StepV2Context, StepItemV2Context } from "./types";

export const STEP_V2_INJECTION_KEY: InjectionKey<StepV2Context> =
  Symbol("StepV2Context");

export const STEP_ITEM_V2_INJECTION_KEY: InjectionKey<StepItemV2Context> =
  Symbol("StepItemV2Context");
