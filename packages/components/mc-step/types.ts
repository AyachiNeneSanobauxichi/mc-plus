import type { ComputedRef, Ref } from "vue";

export type StepKey = string | number;

export interface StepItem {
  key: StepKey;
  label?: string;
  desc?: string;
  disabled?: boolean | ComputedRef<boolean> | Ref<boolean>;
}

export interface StepProps {
  modelValue: StepKey;
  steps: StepItem[];
  successStep?: StepKey;
}

export interface StepEmits {
  (e: "update:modelValue", value: StepKey): void;
  (e: "change", value: StepKey): void;
}

export interface StepInstance {
  ref: Ref<HTMLDivElement | void>;
}
