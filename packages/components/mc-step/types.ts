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
}

export interface StepEmits {
  (e: "change", value: StepKey): void;
  (e: "success", value: StepKey): void;
}

export interface StepInstance {
  ref: Ref<HTMLDivElement | void>;
  setSuccessStep: (key: StepKey) => void;
}
