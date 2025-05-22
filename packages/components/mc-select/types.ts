import type { Ref } from "vue";

export type SelectType = "single" | "multi-choice";

export interface SelectOptionProps {
  value: string;
  label: string;
}

export interface SelectOptionInstance {
  isShow: boolean;
  ref: Ref<HTMLLIElement | undefined>;
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
  searchValue: Ref<string>;
  selectValues: Ref<string[]>;
  handleSelect(item: SelectOptionProps): void;
}
