import type { Placement } from "@popperjs/core";
import type { IconType } from "mc-plus";

export type TooltipTheme = "light" | "dark";

export interface TooltipProps {
  iconSize?: number;
  iconName?: IconType;
  content?: string;
  theme?: TooltipTheme;
  placement?: Placement;
  showArrow?: boolean;
  iconColor?: string;
}
