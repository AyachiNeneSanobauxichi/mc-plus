export type UploadLang = "en" | "zh";

export type UploadState = "loading" | "failed" | "successed";

export type UploadFileMap = Map<string, UploadFile>;

export type UploadTheme = "light" | "gray";

export interface UploadFile {
  fid?: number;
  name?: string;
  size?: number;
  status?: UploadState;
  errorMessage?: string;
  uploadBy?: string;
  uploadTime?: string | number;
  progress?: number;
  file?: File;
}
