import type { ComputedRef, Ref } from "vue";

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
  successStepIndex: Ref<number>;
  activeStep?: ComputedRef<StepV2Value | undefined>;
  stepItems: StepItemV2Props[];
  addStepItem(item: StepItemV2Props): void;
  removeStepItem(item: StepItemV2Props): void;
}

export interface StepV2Instance {
  setSuccessIndex(index: number): void;
  setSuccessStep(step: StepV2Value): void;
}
