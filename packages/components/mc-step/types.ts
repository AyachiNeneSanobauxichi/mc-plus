import type { Component, ComputedRef, Ref } from "vue";

export type StepKey = string | number;

export type StepType = "horizontal" | "vertical";

export interface StepItem {
  key: StepKey;
  label?: string;
  desc?: string;
  disabled?: boolean | ComputedRef<boolean> | Ref<boolean>;
  component?: Component;
}

export interface StepProps {
  modelValue: StepKey;
  steps: StepItem[];
  type?: StepType;
  successStep?: StepKey;
}

export interface StepEmits {
  (e: "update:modelValue", value: StepKey): void;
  (e: "change", value: StepKey): void;
}

export interface StepInstance {
  ref: Ref<HTMLDivElement | void>;
}
