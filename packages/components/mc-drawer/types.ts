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
  title?: string;
  size?: DrawerSize;
  leftButton?: DrawerButton;
  cancel?: DrawerButton;
  middleButton?: DrawerButton;
  rightButton?: DrawerButton;
}

export interface DrawerEmits {
  (e: "update:visible", value: boolean): void;
  (e: "close"): void;
  (e: "click:cancel"): void;
}

export interface DrawerFooterConfig {
  leftButton?: DrawerButton;
  cancel?: DrawerButton;
  middleButton?: DrawerButton;
  rightButton?: DrawerButton;
}
