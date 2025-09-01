import type { McStepItemPlusProps } from "./mc-step-item";

export type StepKey = string | number | undefined;

export interface McStepPlusProps {
  modelValue: StepKey;
  steps: McStepItemPlusProps[];
}
