import type { ComputedRef } from "vue";

export interface RadioProps {
  label?: string;
  value: string;
  disabled?: boolean;
  remark?: string;
  help?: string;
}

export interface RadioGroupProps {
  modelValue?: string;
  disabled?: boolean;
}

export interface RadioGroupContext {
  modelValue?: ComputedRef<string | undefined>;
  disabled?: ComputedRef<boolean | undefined>;
  hasError?: ComputedRef<boolean>;
  handleSelect: (val?: string) => void;
}

export interface RadioGroupEmits {
  (e: "update:modelValue", val?: string): void;
  (e: "change", val?: string): void;
}
