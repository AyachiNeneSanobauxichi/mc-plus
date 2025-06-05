import type { IconType } from "../mc-icon";

export type DrawerSize = "large" | "medium" | "small";

export type DrawerButton = {
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
}

export interface DrawerEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: "click:cancel"): void;
}

export interface DrawerFooterConfig {
  leftButton?: DrawerButton;
  cancel?: DrawerButton;
  middleButton?: DrawerButton;
  rightButton?: DrawerButton;
}
