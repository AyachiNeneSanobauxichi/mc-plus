import type { Ref } from "vue";

export type UploadState = "loading" | "failed" | "successed";

export type UploadFunc = (file: File) => Promise<UploadResponse>;

export interface UploadFile {
  fid?: number;
  name: string;
  size: number;
  status: UploadState;
  errorMessage?: string;
  uploadBy: string;
  uploadTime: string | number;
}

export interface UploadProps {
  fileSize?: number | string;
  fileCount?: number;
  files?: number[];
  hiddenIcon?: boolean;
  allowedFileTypes?: string[];
  uploadUser?: string;
  uploadFunc?: UploadFunc;
}

export interface UploadResponse {
  id: number;
  fileName: string;
}

export interface UploadEmits {
  (e: "upload", value: number[]): void;
  (e: "update:files", value: number[]): void;
  (e: "error:count"): void;
  (e: "error:size"): void;
}

export interface UploadInstance {
  uploadInputRef: Ref<HTMLDivElement | void>;
  clear: () => void;
}
