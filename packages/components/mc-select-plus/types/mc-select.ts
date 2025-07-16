import type { SelectPlusValue } from "./common";

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
  "update-modelValue": [value: SelectPlusValue | SelectPlusValue[]];
}
