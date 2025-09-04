import type { IconType } from "../../mc-icon";
import type {
  McStepChildItemPlusProps,
  McStepChildItemPlusSlots,
} from "./mc-step-child-item";

export interface McStepItemPlusProps extends McStepChildItemPlusProps {
  icon?: IconType;
}

export type McStepItemPlusSlots = McStepChildItemPlusSlots;
