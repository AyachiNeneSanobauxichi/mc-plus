export interface SelectMultiOptionProps {
  modelValue?: boolean;
  label?: string;
}

export interface SelectMultiOptionEmits {
  (e: "update:modelValue", value: boolean): void;
}
