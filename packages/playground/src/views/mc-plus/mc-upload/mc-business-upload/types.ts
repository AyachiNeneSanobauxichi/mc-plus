export interface McBusinessUploadProps {
  modelValue?: string[] | undefined;
  uploadUser?: string | undefined;
}

export interface McBusinessUploadEmits {
  (e: "update:modelValue", value: string[]): void;
}
