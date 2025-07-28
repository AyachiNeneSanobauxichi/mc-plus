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
            <span class="mc-upload-dropzone-title-text">
              {{ title || langMap.upload_note }}
            </span>
          </slot>
        </div>
        <div class="mc-upload-dropzone-desc">
          <slot name="desc">
            <span v-if="fileSize > 0">
              {{ langMap.max_size }} {{ getFileSize(fileSize) }}
            </span>
            <span v-if="displayFileTypes">
              {{ displayFileTypes }}
            </span>
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
  UploadDropzoneInstance,
  UploadDropzoneProps,
  UploadFile,
} from "./types";
import { computed, ref } from "vue";
import { includes, map } from "lodash-es";
import { useDragover } from "@mc-plus/hooks";
import McIcon from "../mc-icon/mc-icon.vue";
import { getFileSize, updateFileStatus } from "./utils";
import { useLang } from "./hooks";
import { ALLOW_FILE_TYPES, WILDCARD } from "./constant";

// options
defineOptions({ name: "McUploadDropzone" });

// props
const props = withDefaults(defineProps<UploadDropzoneProps>(), {
  icon: "Document_Upload",
  fileSize: 15 * 1024 * 1024,
  uploadUser: "--",
  lang: "en",
  allowedFileTypes: () => ALLOW_FILE_TYPES,
});

// emits
const emit = defineEmits<UploadDropzoneEmits>();

// use lang
const { langMap } = useLang(props.lang);

// cover ref
const coverRef = ref<HTMLElement>();

// display file types
const displayFileTypes = computed(() => {
  if (!props.allowedFileTypes?.length) return void 0;
  else {
    return langMap.value.limit_type.replace(
      WILDCARD,
      map(props.allowedFileTypes, (type: string) => type.toUpperCase()).join(
        ", "
      )
    );
  }
});

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
const validateFileType = (
  files: File[],
  uploadFileMap: Map<string, UploadFile>
) => {
  const allowTypes = props.allowedFileTypes;
  if (!allowTypes?.length) return true;
  let res = false;
  const allowedTypes = map(allowTypes, (type: string) => type.toUpperCase());
  for (let i = 0; i < files.length; i++) {
    const fileType = files[i].name.split(".").pop()?.toUpperCase() ?? "--";
    if (!includes(allowedTypes, fileType)) {
      updateFileStatus(uploadFileMap, files[i].name, {
        status: "failed",
        errorMessage: displayFileTypes.value,
      });
      emit("error:type", files[i].name);
    } else {
      res = true;
    }
  }

  return res;
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
      updateFileStatus(uploadFileMap, file.name, {
        status: "failed",
        errorMessage: langMap.value.limit_size.replace(
          WILDCARD,
          `${getFileSize(maxSize)}`
        ),
      });
      emit("error:size", file.name);
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

  // init files status
  fileArray.forEach((file: File) => {
    updateFileStatus(uploadFileMap, file.name, {
      name: file.name,
      size: file.size,
      status: "loading",
      uploadBy: props.uploadUser,
      uploadTime: Date.now(),
      file,
    });
  });

  // check file size
  validateFileSize(fileArray, uploadFileMap);

  // check files
  validateFileType(fileArray, uploadFileMap);

  emit("upload", uploadFileMap);
  clearUploadInput();
};

// expose
defineExpose<UploadDropzoneInstance>({
  clearUploadInput,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-upload-dropzone.scss";
</style>
