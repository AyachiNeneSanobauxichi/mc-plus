export interface SwitchProps {
  modelValue?: boolean | undefined;
  width?: string;
  height?: string;
  activeText?: string;
  inactiveText?: string;
  disabled?: boolean;
}

export interface SwitchEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean): void;
}
