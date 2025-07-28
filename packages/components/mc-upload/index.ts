import _McUpload from "./mc-upload.vue";
import _McFileList from "./mc-file-list.vue";
import _McUploadDropzone from "./mc-upload-dropzone.vue";

import { withInstall } from "@mc-plus/utils";

export * from "./types";
export const McUpload = withInstall(_McUpload);
export const McFileList = withInstall(_McFileList);
export const McUploadDropzone = withInstall(_McUploadDropzone);
