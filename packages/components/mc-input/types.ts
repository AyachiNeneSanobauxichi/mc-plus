export interface InputProps {
  modelValue?: string;
  search?: boolean;
  disabled?: boolean;
  password?: boolean;
  placeholder?: string;
}

export interface InputEmits {
  (e: "update:modelValue", value?: string): void;
  (e: "input", value?: string): void;
  (e: "change", value?: string): void;
  (e: "focus", event: Event): void;
  (e: "blur", event: Event): void;
}

export interface InputInstance {
  ref: HTMLInputElement;
}
