import type { Ref } from "vue";

export type InputType = "text" | "password" | "number" | "email";

export type InputAutocomplete = "off" | "on";

export interface InputProps {
  modelValue: string;
  type?: InputType;
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: InputAutocomplete;
  autofocus?: boolean;
}

export interface InputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "input", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", value: FocusEvent): void;
  (e: "blur", value: FocusEvent): void;
  (e: "clear"): void;
}

export interface InputInstance {
  ref: Ref<HTMLInputElement | void>;
  focus(): Promise<void>;
  blur(): void;
  select(): void;
  clear(): void;
}
