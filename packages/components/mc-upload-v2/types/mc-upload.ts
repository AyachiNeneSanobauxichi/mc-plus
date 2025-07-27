import type { UploadFile, UploadTheme } from "./common";
import type { FileListV2Emits } from "./mc-file-list";
import type {
  UploadDropzoneEmits,
  UploadDropzoneProps,
} from "./mc-upload-dropzone";

export interface McUploadProps extends UploadDropzoneProps {
  modelValue?: UploadFile[] | undefined;
  downloadable?: boolean;
  theme?: UploadTheme;
}

export interface McUploadEmits extends UploadDropzoneEmits, FileListV2Emits {
  (e: "download:all", files: UploadFile[]): void;
  (e: "clear"): void;
  (e: "upload", files: UploadFile[]): void;
  (e: "change", files: UploadFile[]): void;
}

export interface UploadDropzoneInstance {
  clearFiles: () => void;
  downloadAllFiles: (file: UploadFile[]) => void;
}
