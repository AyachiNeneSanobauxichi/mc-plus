import type { ComputedRef } from "vue";

export interface SelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue: string;
  id?: string;
  options: SelectOptionProps[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export interface SelectStatus {
  inputValue: string;
  selectedOptions: SelectOptionProps | void | null;
  mouseHover: boolean;
  loading: boolean;
  highlightedIndex: number;
}

export interface SelectEmits {
  (e: "update:modelValue", val: string): void;
  (e: "change", val: string): void;
  (e: "clear"): void;
  (e: "focus"): void;
  (e: "blur"): void;
}

export interface SelectContext {
  selectStatus: SelectStatus;
  highlightedLine?: ComputedRef<SelectOptionProps | void>;
  handleSelect(item: SelectOptionProps): void;
}

export interface SelectInstance {
  focus: () => void;
  blur: () => void;
}
