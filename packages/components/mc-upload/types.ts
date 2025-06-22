import type { Ref } from "vue";

export type UploadState = "loading" | "failed" | "successed";

export type UploadFunc = (file: File) => Promise<UploadFile>;

export interface UploadFile {
  fid?: number;
  name?: string;
  size?: number;
  status?: UploadState;
  errorMessage?: string;
  uploadBy?: string;
  uploadTime?: string | number;
}

export interface UploadProps {
  modelValue?: UploadFile[] | undefined;
  fileSize?: number | string;
  fileCount?: number;
  hiddenIcon?: boolean;
  allowedFileTypes?: string[];
  uploadUser?: string;
  uploadFunc?: UploadFunc;
}

export interface UploadEmits {
  (e: "upload", files: UploadFile[]): void;
  (e: "update:modelValue", files: UploadFile[]): void;
  (e: "delete:file", file: UploadFile): void;
  (e: "review:file", file: UploadFile): void;
  (e: "error:count"): void;
  (e: "error:size"): void;
}

export interface UploadInstance {
  uploadInputRef: Ref<HTMLDivElement | void>;
  clear: () => void;
}

export type FileListTheme = "grey" | "white";

export interface FileListProps {
  files?: UploadFile[] | undefined;
  deletable?: boolean;
  theme?: FileListTheme;
}

export interface FileListEmits {
  (e: "delete:file", file: UploadFile): void;
  (e: "review:file", file: UploadFile): void;
}

export interface FileInstance {
  ref: Ref<HTMLDivElement | void>;
}
