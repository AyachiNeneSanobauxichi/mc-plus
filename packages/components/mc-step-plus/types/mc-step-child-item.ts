import type { Slot } from "vue";
import type { McStepKey } from "./mc-step";

export interface McStepChildItemPlusProps {
  key?: McStepKey;
  label?: string;
  desc?: string;
  showContent?: boolean;
  success?: boolean;
}

export interface McStepChildItemPlusSlots {
  default?: Slot;
  icon?: Slot;
  label?: Slot;
  desc?: Slot;
}
