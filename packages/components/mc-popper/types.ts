import type { Placement, Options } from "@popperjs/core";

export type PopperTrigger = "hover" | "click" | "manual";

export interface PopperProps {
  content?: string;
  trigger?: PopperTrigger;
  placement?: Placement;
  disabled?: boolean;
  popperOptions?: Partial<Options>;
  showTimeout?: number;
  hideTimeout?: number;
  transitionName?: string;
  showArrow?: boolean;
}

export interface PopperEmits {
  (e: "visible:change", value: boolean): void;
  (e: "click:outside"): void;
}

export interface PopperInstance {
  show(): void;
  hide(): void;
}
