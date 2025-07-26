import type { IconType } from "../../mc-icon";
import type { UploadFileMap, UploadLang } from "./common";

export type UploadDropzoneProps = {
  title?: string;
  icon?: IconType;
  allowedFileTypes?: string[];
  fileSize?: number;
  uploadUser?: string;
  lang?: UploadLang;
};

export type UploadDropzoneEmits = {
  (e: "upload", fileMap: UploadFileMap): void;
  (e: "error:type", fileName: string): void;
  (e: "error:size", fileName: string): void;
};

export interface UploadDropzoneInstance {
  clearUploadInput: () => void;
}
