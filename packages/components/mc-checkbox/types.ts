import type { Ref } from "vue";

export interface CheckboxProps {
  modelValue?: boolean | undefined;
  disabled?: boolean;
  content?: string;
  remarks?: string;
  partial?: boolean;
}

export interface CheckboxEmits {
  (e: "change", val: boolean): void;
  (e: "update:modelValue", val: boolean): void;
}

export interface CheckboxInstance {
  ref: Ref<HTMLButtonElement | void>;
}
