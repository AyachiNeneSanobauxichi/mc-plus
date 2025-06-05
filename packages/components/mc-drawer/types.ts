import type { Ref } from "vue";
import type { IconType } from "../mc-icon";

export type DrawerSize = "large" | "medium" | "small";

export type DrawerButton = {
  key: string;
  text?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  hidden?: boolean;
  disable?: boolean;
};

export interface DrawerProps {
  modelValue?: boolean;
  title?: string;
  size?: DrawerSize;
  leftButton?: DrawerButton;
  cancel?: DrawerButton;
  middleButton?: DrawerButton;
  rightButton?: DrawerButton;
  clickOverlayClose?: boolean;
  fixed?: boolean;
  portCssSelector?: string;
}

export interface DrawerEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: string): void;
}

export interface DrawerFooterConfig {
  leftButton?: DrawerButton;
  cancel?: DrawerButton;
  middleButton?: DrawerButton;
  rightButton?: DrawerButton;
}

export interface DrawerInstance {
  ref: Ref<HTMLDivElement | void>;
  open: () => void;
  close: () => void;
}
