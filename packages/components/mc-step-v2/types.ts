import type { ComputedRef } from "vue";

export type StepV2Value = string | number;

export interface StepV2Props {
  modelValue?: StepV2Value | undefined;
}

export interface StepV2Emits {
  (e: "update:modelValue", value: StepV2Value): void;
  (e: "change", value: StepV2Value): void;
}

export type StepItemV2SuccessCondition = "all" | "any";

export interface StepChildItemV2Props {
  name: StepV2Value;
  label?: string;
  desc?: string;
  disabled?: boolean;
  succeed?: boolean;
}

export interface StepItemV2Props extends StepChildItemV2Props {
  successCondition?: StepItemV2SuccessCondition;
}

export interface StepV2Context {
  activeStep?: ComputedRef<StepV2Value | undefined>;
  stepItems: StepItemV2Props[];
  addStepItem(item: StepItemV2Props): void;
  removeStepItem(item: StepItemV2Props): void;
}
