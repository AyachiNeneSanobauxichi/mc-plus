import type { ComputedRef, Ref, VNode } from "vue";

// export type SelectType = "single" | "multi-choice";
export type SelectType = "single";

export type SelectValue = number | string;

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
  modelValue?: SelectValue | undefined;
  placeholder?: string;
  disabled?: boolean;
  type?: SelectType;
  width?: string;
  height?: string;
  search?: boolean;
}

export interface SelectEmits {
  (e: "update:modelValue", val: SelectValue | SelectValue[]): void;
  (e: "change", val: SelectValue | SelectValue[]): void;
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
