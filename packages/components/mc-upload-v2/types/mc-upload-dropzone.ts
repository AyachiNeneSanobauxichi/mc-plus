import type { IconType } from "../../mc-icon";
import type { UploadFile, UploadLang } from "./common";

export type UploadDropzoneProps = {
  title?: string;
  icon?: IconType;
  allowedFileTypes?: string[];
  fileSize?: number;
  uploadUser?: string;
  lang?: UploadLang;
};

export type UploadDropzoneEmits = {
  (e: "upload", files: UploadFile[]): void;
  (e: "error:type"): void;
  (e: "error:size"): void;
};
