import type { ComputedRef } from "vue";

export type RadioValue = number | string | boolean;

export interface RadioProps {
  label?: string;
  value: RadioValue;
  disabled?: boolean;
  remark?: string;
  help?: string;
}

export interface RadioGroupProps {
  modelValue?: RadioValue;
  disabled?: boolean;
}

export interface RadioGroupContext {
  modelValue?: ComputedRef<string | undefined>;
  disabled?: ComputedRef<boolean | undefined>;
  hasError?: ComputedRef<boolean>;
  handleSelect: (val?: RadioValue) => void;
}

export interface RadioGroupEmits {
  (e: "update:modelValue", val?: RadioValue): void;
  (e: "change", val?: RadioValue): void;
}
