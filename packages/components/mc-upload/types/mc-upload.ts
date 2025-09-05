import type { UploadFile, UploadTheme } from "./common";
import type { UploadDropzoneProps } from "./mc-upload-dropzone";

export interface McUploadProps extends UploadDropzoneProps {
  modelValue?: UploadFile[] | undefined;
  downloadable?: boolean;
  allowCancel?: boolean;
  deletable?: boolean;
  disabled?: boolean;
  theme?: UploadTheme;
  width?: string | number;
  succeed?: boolean;
}

export interface McUploadEmits {
  (e: "update:modelValue", files: UploadFile[]): void;
  (e: "download:all", files: UploadFile[]): void;
  (e: "clear"): void;
  (e: "error:type", fileName: string): void;
  (e: "error:size", fileName: string): void;
  (e: "upload", files: UploadFile[]): void;
  (e: "change", files: UploadFile[]): void;
  (e: "delete", file: UploadFile): void;
  (e: "download", file: UploadFile): void;
  (e: "preview", file: UploadFile): void;
  (e: "cancel", file: UploadFile): void;
}

export interface UploadInstance {
  clearFiles: () => void;
  downloadAllFiles: () => void;
}
