import type { Ref } from "vue";
import type {
  _FilteredOptionNode,
  _OptionNode,
  SelectPlusValue,
} from "./common";
import type { SelectOptionInternalInstance } from "./mc-select-option";

export interface SelectPlusProps {
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  search?: boolean;
  options?: SelectPlusValue[];
  modelValue?: SelectPlusValue | SelectPlusValue[];
}

export interface SelectPlusEmits {
  (
    e: "update:modelValue",
    value: SelectPlusValue | SelectPlusValue[] | undefined
  ): void;
  (e: "change", value: SelectPlusValue | SelectPlusValue[] | undefined): void;
  (e: "focus"): void;
  (e: "blur"): void;
}

export interface SelectPlusContext {
  select: (option: SelectOptionInternalInstance["proxy"]) => void;
  filteredOptions: Ref<_FilteredOptionNode[]>;
  filteredGroups: Ref<(string | undefined)[]>;
}
