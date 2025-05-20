import type { Ref } from "vue";

export interface SwitchProps {
  modelValue?: boolean;
  width?: string;
  label?: string;
  disabled?: boolean;
  onText?: string;
  offText?: string;
}

export interface SwitchEmits {
  (e: "update:modelValue", val: boolean): void;
}

export interface SwitchInstance {
  ref: Ref<HTMLLabelElement | void>;
}
