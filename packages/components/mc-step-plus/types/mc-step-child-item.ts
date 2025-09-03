import type { McStepKey } from "./mc-step";

export interface McStepChildItemPlusProps {
  key?: McStepKey;
  label?: string;
  desc?: string;
  showContent?: boolean;
  success?: boolean;
}
