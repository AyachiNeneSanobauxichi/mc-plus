import type { Ref } from "vue";
import type { IconType } from "../mc-icon/types";

export type ButtonType = "primary" | "plain" | "link";
export type NativeType = "button" | "submit" | "reset";
export type ButtonSize = "medium" | "large" | "small";

export interface ButtonProps {
  type?: ButtonType;
  nativeType?: NativeType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
  leftIcon?: IconType;
  rightIcon?: IconType;
  content?: string;
  height?: string;
  width?: string;
}

export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}
