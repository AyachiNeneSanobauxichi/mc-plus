import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  Ref,
} from "vue";
import type { Placement } from "@popperjs/core";
import type { InputGroupPosition } from "../../mc-input-group/types";
import type {
  _FilteredOptionNode,
  _OptionNode,
  SelectPlusValue,
} from "./common";

export interface SelectPlusProps {
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  search?: boolean;
  options?: SelectPlusValue[];
  showHeader?: boolean;
  showFooter?: boolean;
  modelValue?: SelectPlusValue | SelectPlusValue[];
  placement?: Placement;
  inputGroupPosition?: InputGroupPosition;
  disableValidation?: boolean;
}

export interface SelectPlusEmits {
  (
    e: "update:modelValue",
    value: SelectPlusValue | SelectPlusValue[] | undefined
  ): void;
  (e: "change", value: SelectPlusValue | SelectPlusValue[] | undefined): void;
  (e: "focus"): void;
  (e: "blur"): void;
  (e: "expand", expand: boolean): void;
}

export interface SelectPlusContext {
  isMulti: Ref<boolean>;
  selectedOption: Ref<SelectPlusValue | SelectPlusValue[]>;
  filteredOptions: Ref<_FilteredOptionNode[]>;
  filteredGroups: Ref<(string | undefined)[]>;
  hoverOption: Ref<SelectPlusValue | undefined>;
  select: (option: SelectPlusValue) => void;
  hover: (option: SelectPlusValue) => void;
}

export type SelectPublicInstance = ComponentPublicInstance<SelectPlusProps>;

export type SelectInternalInstance = ComponentInternalInstance & {
  proxy: SelectPublicInstance;
};
