import type { Ref } from "vue";

export type DrawerSize = "large" | "medium" | "small";

export interface DrawerProps {
  modelValue?: boolean;
  title?: string;
  size?: DrawerSize;
  maskClosable?: boolean;
  fixed?: boolean;
  portCssSelector?: string;
  showBorder?: boolean;
  hideFooter?: boolean;
}

export interface DrawerEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}

export interface DrawerInstance {
  ref: Ref<HTMLDivElement | void>;
  open: () => void;
  close: () => void;
}
