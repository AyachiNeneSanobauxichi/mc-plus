import type { UploadFile, UploadTheme } from "./common";
import type { UploadDropzoneProps } from "./mc-upload-dropzone";

export interface McUploadProps extends UploadDropzoneProps {
  modelValue?: UploadFile[] | undefined;
  downloadable?: boolean;
  allowCancel?: boolean;
  theme?: UploadTheme;
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

export interface UploadDropzoneInstance {
  clearFiles: () => void;
  downloadAllFiles: (file: UploadFile[]) => void;
}
