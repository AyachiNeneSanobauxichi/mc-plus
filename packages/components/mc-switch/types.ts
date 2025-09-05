import type { IconType } from "../mc-icon";

export type SwitchSize = "small" | "medium" | "large" | "fit-content";

export interface SwitchProps {
  modelValue?: boolean | undefined;
  width?: string;
  height?: string;
  activeText?: string;
  inactiveText?: string;
  disabled?: boolean;
  size?: SwitchSize;
  label?: string;
  labelPosition?: "left" | "right";
  helpIcon?: IconType;
  helpText?: string;
}

export interface SwitchLabelProps {
  label?: string;
  helpText?: string;
  helpIcon?: IconType;
}

export interface SwitchEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean): void;
}
