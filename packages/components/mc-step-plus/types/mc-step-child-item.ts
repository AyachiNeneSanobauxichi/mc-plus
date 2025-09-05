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
  default?: Slot<{ step: McStepKey; isSuccess: boolean; isActived: boolean }>;
  icon?: Slot<{ step: McStepKey; isSuccess: boolean; isActived: boolean }>;
  label?: Slot<{
    step: McStepKey;
    label: string;
    isSuccess: boolean;
    isActived: boolean;
  }>;
  desc?: Slot<{
    step: McStepKey;
    desc: string;
    isSuccess: boolean;
    isActived: boolean;
  }>;
}
