import type { Slot } from "vue";
import type { IconType } from "../../mc-icon";

export type McStepKey = string | number | undefined;

export interface McStepItem {
  index?: number;
  step: McStepKey;
  label?: string;
  desc?: string;
  icon?: IconType;
  parentStep?: McStepItem;
  isChild?: boolean;
  hasChildren?: boolean;
  children?: McStepItem[];
  childrenSteps?: McStepKey[];
  showContent?: boolean;
  success?: boolean;
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
  (e: "click:step", value: McStepKey): void;
}

export interface McStepInstance {
  goStep(step?: McStepKey): void;
  goNextStep(): void;
  goPreviousStep(): void;
}
