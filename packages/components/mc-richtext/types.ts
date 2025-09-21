export interface McRichtextProps {
  modelValue?: string | undefined;
}

export interface McRichtextEmits {
  (e: "update:modelValue", value: string): void;
}
