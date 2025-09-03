import type { Slot } from "vue";

export type McStepKey = string | number | undefined;

export interface McStepItem {
  index?: number;
  step: McStepKey;
  label?: string;
  desc?: string;
  parentStep?: McStepItem;
  isChild?: boolean;
  hasChildren?: boolean;
  children?: McStepItem[];
  childrenSteps?: McStepKey[];
  content?: Slot;
}

export interface McStepProps {
  modelValue?: McStepKey;
  successSteps?: McStepKey[];
}

export interface McStepEmits {
  (e: "update:modelValue", value: McStepKey): void;
  (e: "update:successSteps", value: McStepKey[]): void;
  (e: "change", value: McStepKey): void;
}

export interface McStepInstance {
  goStep(step?: McStepKey): void;
  goNextStep(): void;
  goPreviousStep(): void;
}
