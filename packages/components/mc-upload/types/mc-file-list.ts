import type { UploadFile, UploadLang, UploadTheme } from "./common";

export type FileListProps = {
  modelValue?: UploadFile[] | undefined;
  theme?: UploadTheme;
  lang?: UploadLang;
  downloadable?: boolean;
  allowCancel?: boolean;
};

export type FileListEmits = {
  (e: "update:modelValue", files: UploadFile[]): void;
  (e: "change", files: UploadFile[]): void;
  (e: "delete", file: UploadFile): void;
  (e: "download", file: UploadFile): void;
  (e: "preview", file: UploadFile): void;
  (e: "cancel", file: UploadFile): void;
};
