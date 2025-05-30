import type { Ref } from "vue";

export interface LightboxProps {
  modelValue?: boolean;
  title?: string;
  content?: string;
  showClose?: boolean;
  size?: "small" | "medium" | "large";
  position?: "top" | "center" | "bottom";
  // 点击遮罩层是否关闭
  maskClosable?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

export interface LightboxEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: "confirm"): void;
}

export interface LightboxInstance {
  ref: Ref<HTMLDivElement | void>;
  close: () => void;
}
