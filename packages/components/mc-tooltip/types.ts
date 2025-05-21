import type { Placement, Options } from "@popperjs/core";

export type TooltipTrigger = "hover" | "click";

export interface TooltipProps {
  content?: string;
  trigger?: TooltipTrigger;
  placement?: Placement;
  disabled?: boolean;
  popperOptions?: Partial<Options>;
  showTimeout?: number;
  hideTimeout?: number;
  transitionName?: string;
}

export interface TooltipEmits {
  (e: "visible:change", value: boolean): void;
  (e: "click:outside"): void;
}

export interface TooltipInstance {
  show(): void;
  hide(): void;
}
