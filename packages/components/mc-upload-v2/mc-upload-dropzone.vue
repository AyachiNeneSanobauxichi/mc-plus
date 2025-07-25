<template>
  <div
    ref="wrapperRef"
    class="mc-upload-dropzone"
    :class="{ 'mc-upload-dropzone-dragover': isDragover }"
    @click="handleUploadClick"
  >
    <div class="mc-upload-dropzone-area">
      <slot name="area">
        <div class="mc-upload-dropzone-title">
          <slot name="title">
            <mc-icon :name="icon" />
            <span class="mc-upload-dropzone-title-text">{{
              title || langMap.upload_note
            }}</span>
          </slot>
        </div>
        <div class="mc-upload-dropzone-desc">
          <slot name="desc">
            <span>Max file size: 15MB</span>
            <span>JPG, JPEG, PNG, DOC, DOCX, XLS, XLSX and PDF only.</span>
          </slot>
        </div>
      </slot>
    </div>
    <input
      ref="uploadInputRef"
      type="file"
      multiple
      style="display: none"
      @change="handleFileChange"
    />
    <div class="mc-upload-dropzone-cover" ref="coverRef"></div>
  </div>
</template>

<script setup lang="ts">
import type {
  UploadDropzoneEmits,
  UploadDropzoneProps,
  UploadFile,
} from "./types";
import { ref } from "vue";
import { filter, includes, map } from "lodash-es";
import { useDragover } from "@mc-plus/hooks";
import McIcon from "../mc-icon/mc-icon.vue";
import { getFileSize } from "./utils";
import { useLang } from "./hooks";
import { WILDCARD } from "./constant";

// options
defineOptions({ name: "McUploadDropzone" });

// props
const props = withDefaults(defineProps<UploadDropzoneProps>(), {
  icon: "Document_Upload",
  fileSize: 15 * 1024 * 1024,
  uploadUser: "--",
  lang: "en",
  allowedFileTypes: () => [],
});

// emits
const emit = defineEmits<UploadDropzoneEmits>();

// use lang
const { langMap } = useLang(props.lang);

// cover ref
const coverRef = ref<HTMLElement>();

// handle drop
const handleDrop = (e: DragEvent) => {
  const droppedFiles = e.dataTransfer?.files;
  if (!droppedFiles) return;
  uploadFiles(droppedFiles);
};

// use dragover
const { isDragover } = useDragover(coverRef, {
  onDrop: handleDrop,
});

// upload input ref
const uploadInputRef = ref<HTMLInputElement>();

// clear upload input
const clearUploadInput = () => {
  if (uploadInputRef.value) {
    uploadInputRef.value.value = "";
  }
};

// handle upload click
const handleUploadClick = () => {
  uploadInputRef.value?.click();
};

// handle file change
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;
  uploadFiles(files);
};

// check file type
const validateFileType = (files: File[]) => {
  const allowTypes = props.allowedFileTypes;
  if (allowTypes?.length) {
    const allowedTypes = map(allowTypes, (type: string) => type.toUpperCase());
    const _files = filter(files, (file: File) => {
      const fileType = file.name.split(".").pop()?.toUpperCase() ?? "--";
      return includes(allowedTypes, fileType);
    });

    if (_files.length !== files.length) {
      emit("error:size");
    }
    files = _files;
  }

  return files;
};

// check file size
const validateFileSize = (
  files: File[],
  uploadFileMap: Map<string, UploadFile>
) => {
  const maxSize = props.fileSize;
  if (maxSize <= 0) return true;
  let res = false;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > maxSize) {
      uploadFileMap.set(file.name, {
        name: file.name,
        size: file.size,
        status: "failed",
        errorMessage: langMap.value.limit_size.replace(
          WILDCARD,
          `${getFileSize(maxSize)}`
        ),
        uploadBy: props.uploadUser,
        uploadTime: Date.now(),
      });
    } else {
      res = true;
    }
  }

  return res;
};

// file upload
const uploadFiles = async (files: FileList) => {
  // input files
  let fileArray = Array.from(files);
  // upload files
  const uploadFileMap = new Map<string, UploadFile>();

  // check file type
  fileArray = validateFileType(fileArray);
  if (!fileArray.length) {
    clearUploadInput();
    return;
  }

  fileArray.forEach((file: File) => {
    uploadFileMap.set(file.name, {
      name: file.name,
      size: file.size,
      status: "loading",
      uploadBy: props.uploadUser,
      uploadTime: Date.now(),
    });
  });

  // // check file size
  // if (!validateFileSize(fileArray)) {
  //   if (uploadFileRef.value) {
  //     uploadFileRef.value.value = "";
  //   }
  //   return;
  // }

  // // upload queue
  // const uploadQueue = [];
  // for (const file of fileArray) {
  //   if (
  //     allFileMap.has(file.name) &&
  //     allFileMap.get(file.name)!.status === "loading"
  //   ) {
  //     uploadQueue.push(uploadApi(file));
  //   }
  // }

  // // upload
  // const res = await Promise.allSettled(uploadQueue);
  // for (let i = 0; i < res.length; i++) {
  //   const currentfile = fileArray[i];
  //   if (res[i].status === "fulfilled") {
  //     const fid = (res[i] as { value: { fid: number } })?.value?.fid;
  //     allFileMap.set(currentfile.name, {
  //       fid,
  //       name: currentfile.name,
  //       size: currentfile.size,
  //       status: "successed",
  //       uploadBy: props.uploadUser,
  //       uploadTime: Date.now(),
  //     });
  //   } else {
  //     const errorMessage =
  //       (res[i] as { reason: { message: string } })?.reason?.message ||
  //       "Upload failed";
  //     console.error(res[i]);
  //     allFileMap.set(currentfile.name, {
  //       name: currentfile.name,
  //       size: currentfile.size,
  //       status: "failed",
  //       errorMessage,
  //       uploadBy: props.uploadUser,
  //       uploadTime: Date.now(),
  //     });
  //   }
  // }

  // emitUploadEvent();
};

//
</script>

<style scoped lang="scss">
@use "./styles/mc-upload-dropzone.scss";
</style>
