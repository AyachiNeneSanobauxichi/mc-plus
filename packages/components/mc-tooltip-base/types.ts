import type { Placement, Options } from "@popperjs/core";

export type TooltipBaseTrigger = "hover" | "click";

export interface TooltipBaseProps {
  content?: string;
  trigger?: TooltipBaseTrigger;
  placement?: Placement;
  disabled?: boolean;
  popperOptions?: Partial<Options>;
  showTimeout?: number;
  hideTimeout?: number;
  transitionName?: string;
}

export interface TooltipBaseEmits {
  (e: "visible:change", value: boolean): void;
  (e: "click:outside"): void;
}

export interface TooltipBaseInstance {
  show(): void;
  hide(): void;
}
