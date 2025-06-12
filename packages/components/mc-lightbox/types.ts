import type { Ref } from "vue";

export type LightboxSize = "large" | "medium" | "small";

export interface LightboxProps {
  modelValue?: boolean;
  title?: string;
  size?: LightboxSize;
  maskClosable?: boolean;
  fixed?: boolean;
  portCssSelector?: string;
}

export interface LightboxEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}

export interface LightboxInstance {
  ref: Ref<HTMLDivElement | void>;
  close: () => void;
  open: () => void;
}
