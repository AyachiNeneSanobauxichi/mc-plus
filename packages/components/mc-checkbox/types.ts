import type { ComputedRef } from "vue";

export type CheckboxValue = string | number;

export interface CheckboxProps {
  modelValue?: boolean | undefined;
  disabled?: boolean;
  content?: string;
  remarks?: string;
  partial?: boolean;
  formValidate?: boolean;
  value?: CheckboxValue;
}

export interface CheckboxEmits {
  (e: "update:modelValue", val: boolean): void;
  (e: "change", val: boolean): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}

export interface CheckboxGroupProps {
  modelValue?: CheckboxValue[] | undefined;
  disabled?: boolean;
}

export interface CheckboxGroupEmits {
  (e: "update:modelValue", val: CheckboxValue[]): void;
  (e: "change", val: CheckboxValue[]): void;
}

export interface CheckboxGroupContext {
  modelValue?: ComputedRef<CheckboxValue[] | undefined>;
  disabled?: ComputedRef<boolean | undefined>;
  handleSelect: (val?: CheckboxValue) => void;
}
