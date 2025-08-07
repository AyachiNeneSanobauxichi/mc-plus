export type McTextareaResize = "none" | "both" | "horizontal" | "vertical";

export interface McTextareaProps {
  modelValue?: string | undefined;
  placeholder?: string;
  disabled?: boolean;
  showCount?: boolean;
  width?: string | number;
  height?: string | number;
  resize?: McTextareaResize;
  maxLength?: number;
}

export interface McTextareaEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}
