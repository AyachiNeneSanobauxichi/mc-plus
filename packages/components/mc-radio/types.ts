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
  modelValue?: RadioValue | undefined;
  disabled?: boolean;
}

export interface RadioGroupContext {
  modelValue?: ComputedRef<RadioValue | undefined>;
  disabled?: ComputedRef<boolean | undefined>;
  handleSelect: (val?: RadioValue) => void;
}

export interface RadioEmits {
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}

export interface RadioGroupEmits {
  (e: "update:modelValue", val?: RadioValue): void;
  (e: "change", val?: RadioValue): void;
}
