export type UploadLang = "en" | "zh";

export type UploadState = "loading" | "failed" | "successed";

export interface UploadFile {
  fid?: number;
  name?: string;
  size?: number;
  status?: UploadState;
  errorMessage?: string;
  uploadBy?: string;
  uploadTime?: string | number;
}
