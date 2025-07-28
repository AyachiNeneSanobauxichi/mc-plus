<template>
  <div class="mc-upload">
    <div class="mc-upload-dropzone-wrapper">
      <mc-upload-dropzone
        ref="uploadDropzoneRef"
        :upload-user="uploadUser"
        :allowed-file-types="allowedFileTypes"
        :file-size="fileSize"
        :icon="icon"
        :lang="lang"
        :theme="theme"
        @upload="handleUpload"
        @error:type="handleErrorType"
        @error:size="handleErrorSize"
      ></mc-upload-dropzone>
    </div>
    <div class="mc-upload-file-list-wrapper">
      <mc-file-list-v2
        :model-value="modelValue"
        :allow-cancel="allowCancel"
        :downloadable="downloadable"
        :lang="lang"
        :theme="theme"
        @update:model-value="handleUpdateModelValue"
        @preview="handlePreview"
        @delete="handleDelete"
        @download="handleDownload"
        @cancel="handleCancel"
      ></mc-file-list-v2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { McUploadEmits, McUploadProps } from "./types/mc-upload";
import type {
  UploadDropzoneInstance,
  UploadFile,
  UploadFileMap,
} from "./types";
import { reactive, ref, watch } from "vue";
import McUploadDropzone from "./mc-upload-dropzone.vue";
import McFileListV2 from "./mc-file-list-v2.vue";
import { ALLOW_FILE_TYPES } from "./constant";

// options
defineOptions({ name: "McUploadV2" });

// props
const props = withDefaults(defineProps<McUploadProps>(), {
  modelValue: () => [],
  downloadable: false,
  allowCancel: false,
  icon: "Document_Upload",
  fileSize: 15 * 1024 * 1024,
  uploadUser: "--",
  lang: "en",
  allowedFileTypes: () => ALLOW_FILE_TYPES,
  theme: "light",
});

// emits
const emit = defineEmits<McUploadEmits>();

// upload dropzone ref
const uploadDropzoneRef = ref<UploadDropzoneInstance>();

// all file map
const allFileMap = reactive<UploadFileMap>(new Map());

// set all file map
const setAllFileMap = (files: UploadFile[]) => {
  files.forEach((file) => {
    allFileMap.set(file.name!, file);
  });
};

// watch model value
watch(
  () => props.modelValue,
  (newVal) => {
    setAllFileMap(newVal);
  },
  {
    immediate: true,
  }
);

// get file list
const getFileList = (fileMap: UploadFileMap) => {
  return Array.from([...fileMap.values()]);
};

// handle update model value
const handleUpdateModelValue = (files: UploadFile[]) => {
  emit("update:modelValue", files);
};

// handle upload
const handleUpload = (fileMap: UploadFileMap) => {
  const files = getFileList(fileMap);
  setAllFileMap([...props.modelValue, ...files]);
  const newFileList = getFileList(allFileMap);
  emit("update:modelValue", newFileList);
  emit("upload", newFileList);
  emit("change", newFileList);
  updateProgress();
};

// handle error type
const handleErrorType = (fileName: string) => {
  console.error("mc-upload: error:type:", fileName);
  emit("error:type", fileName);
};

// handle error size
const handleErrorSize = (fileName: string) => {
  console.error("mc-upload: error:size:", fileName);
  emit("error:size", fileName);
};

// handle preview
const handlePreview = (file: UploadFile) => {
  emit("preview", file);
};

// handle delete
const handleDelete = (file: UploadFile) => {
  emit("delete", file);
};

// handle download
const handleDownload = (file: UploadFile) => {
  emit("download", file);
};

// handle cancel
const handleCancel = (file: UploadFile) => {
  emit("cancel", file);
};

// update progress
const updateProgress = (progress: number = 99, timeout: number = 100) => {
  setTimeout(() => {
    props.modelValue.forEach((file) => {
      if (file.status === "loading") {
        file.progress = progress;
      }
    });
  }, timeout);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-upload.scss";
</style>
