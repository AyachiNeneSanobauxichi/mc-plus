export interface McBusinessUploadProps {
  modelValue?: number[] | undefined;
  uploadUser?: string | undefined;
}

export interface McBusinessUploadEmits {
  (e: "update:modelValue", value: number[]): void;
}
