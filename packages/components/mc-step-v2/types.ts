import type { ComputedRef, Ref } from "vue";
import type { IconType } from "../mc-icon";

export type StepV2Value = string | number;

export interface StepV2Props {
  modelValue?: StepV2Value | undefined;
  succeed?: boolean;
  showContent?: boolean;
}

export interface StepV2Emits {
  (e: "update:modelValue", value: StepV2Value): void;
  (e: "change", value: StepV2Value): void;
}

export interface StepChildItemV2Props {
  name: StepV2Value;
  label?: string;
  desc?: string;
  disabled?: boolean;
  succeed?: boolean;
  showContent?: boolean;
}

export interface StepItemV2Props extends StepChildItemV2Props {
  icon?: IconType;
  minHeight?: string;
}

export interface StepV2Context {
  successStepIndex: Ref<number>;
  activeStep?: ComputedRef<StepV2Value | undefined>;
  succeed?: ComputedRef<boolean | undefined>;
  showContent?: ComputedRef<boolean | undefined>;
  stepItems: StepItemV2Props[];
  addStepItem(item: StepItemV2Props): void;
  removeStepItem(item: StepItemV2Props): void;
}

export interface StepItemV2Context {
  succeed?: ComputedRef<boolean | undefined>;
  actived?: ComputedRef<boolean | undefined>;
}

export interface StepV2Instance {
  setSuccessIndex(index: number): void;
  setSuccessStep(step: StepV2Value): void;
}
