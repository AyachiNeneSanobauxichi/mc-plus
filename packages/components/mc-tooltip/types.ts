import type { Placement } from "@popperjs/core";
import type { IconType } from "mc-plus";
import type { PopperTrigger } from "../mc-popper";

export type TooltipTheme = "light" | "dark";

export interface TooltipProps {
  iconSize?: number;
  iconName?: IconType;
  content?: string;
  theme?: TooltipTheme;
  placement?: Placement;
  showArrow?: boolean;
  iconColor?: string;
  trigger?: PopperTrigger;
}
