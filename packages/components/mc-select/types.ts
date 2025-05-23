import type { ComputedRef, Ref } from "vue";

export type SelectType = "single" | "multi-choice";

export interface SelectOptionProps {
  value: string;
  label: string;
  group?: string;
}

export interface SelectOptionInstance {
  isShow: boolean;
  ref: Ref<HTMLLIElement | undefined>;
}

export interface SelectGroupProps {
  label: string;
}

export interface SelectProps {
  modelValue?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  type?: SelectType;
}

export interface SelectEmits {
  (e: "update:modelValue", val: string | string[]): void;
  (e: "change", val: string | string[]): void;
}

export interface SelectContext {
  filterOptions: ComputedRef<SelectOptionProps[]>;
  selectValues: Ref<string[]>;
  handleSelect(item: SelectOptionProps): void;
  removeOption(item: SelectOptionProps): void;
  addOption(item: SelectOptionProps): void;
}

export interface SelectGroupContext {
  groupName: string;
}
