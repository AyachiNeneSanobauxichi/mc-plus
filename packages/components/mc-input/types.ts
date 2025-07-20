import type { Ref } from "vue";
import type { IconType } from "../mc-icon";
import type { InputGroupPosition } from "../mc-input-group/types";

export type InputType = "text" | "password" | "number" | "email" | "currency";

export type InputAutocomplete = "off" | "on";

export type InputFormatter = (value: string) => string;

export type InputParser = (value: string) => string;

export interface InputProps {
  modelValue?: string | undefined;
  width?: string;
  height?: string;
  type?: InputType;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: InputAutocomplete;
  autofocus?: boolean;
  prefixIcon?: IconType;
  suffixIcon?: IconType;
  maxlength?: number;
  currencyAccuracy?: number;
  formValidate?: boolean;
  inputGroupPosition?: InputGroupPosition;
  formatter?: InputFormatter;
  parser?: InputParser;
}

export interface InputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "input", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", value: FocusEvent): void;
  (e: "blur", value: FocusEvent): void;
  (e: "paste", value: ClipboardEvent): void;
  (e: "clear"): void;
  (e: "delete"): void;
}

export interface InputInstance {
  ref: Ref<HTMLInputElement | void>;
  focus(): Promise<void>;
  blur(): void;
  select(): void;
  clear(): void;
}
