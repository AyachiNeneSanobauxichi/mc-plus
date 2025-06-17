import type { Placement } from "@popperjs/core";
import type { IconType } from "mc-plus";

export type TooltipTheme = "light" | "dark";

export interface TooltipProps {
  iconName?: IconType;
  content?: string;
  theme?: TooltipTheme;
  placement?: Placement;
  showArrow?: boolean;
}
