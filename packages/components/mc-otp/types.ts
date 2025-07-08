export interface OtpProps {
  modelValue?: string | undefined;
  disabled?: boolean;
  length?: number;
}

export interface OtpEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus"): void;
  (e: "blur"): void;
}
