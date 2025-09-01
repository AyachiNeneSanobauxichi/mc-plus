import type { Slot } from "vue";

export type McStepKey = string | number | undefined;

export interface McStepItem {
  step?: McStepKey;
  label?: string;
  desc?: string;
  parentKey?: McStepKey;
  context?: Slot;
}

export interface McStepPlusProps {
  modelValue?: McStepKey;
}
