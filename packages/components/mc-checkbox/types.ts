import type { Ref } from "vue";

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
  (e: "change", val: boolean): void;
  (e: "update:modelValue", val: boolean): void;
}

export interface CheckboxInstance {
  ref: Ref<HTMLButtonElement | void>;
}

export interface CheckboxGroupProps {
  modelValue?: CheckboxValue[] | undefined;
  disabled?: boolean;
}

export interface CheckboxGroupEmits {
  (e: "change", val: CheckboxValue[]): void;
  (e: "update:modelValue", val: CheckboxValue[]): void;
}

export interface CheckboxGroupContext {
  modelValue?: CheckboxValue[];
  disabled?: boolean;
  handleSelect: (val?: CheckboxValue) => void;
}
