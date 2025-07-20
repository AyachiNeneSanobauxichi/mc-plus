import type { Ref } from "vue";
import type { ValidateStatus } from "../mc-form";

export type InputGroupPosition = "prefix" | "suffix";

export interface InputGroupContext {
  disabled: Ref<boolean>;
  setInputGroupExpanded: (expanded: boolean) => void;
  setInputGroupValidate: (status: ValidateStatus) => void;
  setInputGroupActived: (
    actived: boolean,
    position: InputGroupPosition
  ) => void;
}

export interface InputGroupProps {
  disabled?: boolean;
  suffixFlex?: number;
  prefixFlex?: number;
}
