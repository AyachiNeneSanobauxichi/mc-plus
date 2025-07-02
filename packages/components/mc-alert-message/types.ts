import type { Ref } from "vue";

export type AlertMessageType = "success" | "error" | "warning" | "info";

export interface AlertMessageProps {
  modelValue?: boolean | undefined;
  width?: string;
  height?: string;
  type?: AlertMessageType;
  message?: string;
  content?: string;
  closable?: boolean;
  hideIcon?: boolean;
  expandable?: boolean;
}

export interface AlertMessageEmits {
  (e: "click"): void;
  (e: "close"): void;
  (e: "update:modelValue", value: boolean): void;
  (e: "expand", value: boolean): void;
}

export interface AlertMessageInstance {
  ref: Ref<HTMLDivElement | undefined>;
  close: () => void;
  expand: () => void;
}
