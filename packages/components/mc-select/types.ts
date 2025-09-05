import type { ComputedRef, Ref, VNode } from "vue";

export type SelectValue = number | string;

export type SelectTag = { label: string; value: SelectValue };

export interface SelectOptionProps {
  value: SelectValue;
  label?: string;
  width?: string;
  height?: string;
  _group?: string;
  _vnode?: VNode;
}

export interface SelectOptionInstance {
  isShow: boolean;
  ref: Ref<HTMLLIElement | undefined>;
}

export interface SelectGroupProps {
  label: string;
  width?: string;
  height?: string;
}

export interface SelectProps {
  modelValue?: SelectValue | SelectValue[] | undefined;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  width?: string;
  height?: string;
  search?: boolean;
  allowReset?: boolean;
  allowSelectAll?: boolean;
}

export interface SelectEmits {
  (e: "update:modelValue", val: SelectValue | SelectValue[] | undefined): void;
  (e: "change", val: SelectValue | SelectValue[] | undefined): void;
  (e: "blur"): void;
  (e: "focus"): void;
  (e: "reset"): void;
}

export interface SelectContext {
  filterOptions: ComputedRef<SelectOptionProps[]>;
  selectValues: Ref<SelectValue[]>;
  handleSelect(item: SelectOptionProps): void;
  removeOption(item: SelectOptionProps): void;
  addOption(item: SelectOptionProps): void;
}

export interface SelectGroupContext {
  groupName: string;
}
