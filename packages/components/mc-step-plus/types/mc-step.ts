import type { Slot } from "vue";

export type McStepKey = string | number | undefined;

export interface McStepItem {
  index?: number;
  step?: McStepKey;
  label?: string;
  desc?: string;
  parentStep?: McStepKey;
  context?: Slot;
}

export interface McStepPlusProps {
  modelValue?: McStepKey;
}
