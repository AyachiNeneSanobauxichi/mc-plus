import type { Ref } from "vue";

export type SelectType = "single" | "multi-choice";

export interface SelectOptionProps {
  value: string;
  label: string;
}

export interface SelectProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: SelectType;
}

export interface SelectEmits {
  (e: "update:modelValue", val: string): void;
}

export interface SelectContext {
  selectValues: Ref<string[]>;
  handleSelect(item: SelectOptionProps): void;
}
