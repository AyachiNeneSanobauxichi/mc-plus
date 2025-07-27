import type { UploadFile, UploadTheme } from "./common";
import type { FileListV2Emits } from "./mc-file-list";
import type { UploadDropzoneProps } from "./mc-upload-dropzone";

export interface McUploadProps extends UploadDropzoneProps {
  modelValue?: UploadFile[] | undefined;
  downloadable?: boolean;
  theme?: UploadTheme;
}

export interface McUploadEmits extends FileListV2Emits {
  (e: "download:all", files: UploadFile[]): void;
  (e: "error:type", fileName: string): void;
  (e: "error:size", fileName: string): void;
  (e: "clear"): void;
  (e: "upload", files: UploadFile[]): void;
  (e: "change", files: UploadFile[]): void;
}

export interface UploadDropzoneInstance {
  clearFiles: () => void;
  downloadAllFiles: (file: UploadFile[]) => void;
}
