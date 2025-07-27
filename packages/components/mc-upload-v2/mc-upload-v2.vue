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
    <div class="mc-upload-file-list-wrapper"></div>
    <!-- <mc-file-list-v2
      v-model="fileList"
      @preview="handlePreview"
      @delete="handleDelete"
      @download="handleDownload"
      @cancel="handleCancel"
    ></mc-file-list-v2> -->
  </div>
</template>

<script setup lang="ts">
import type { McUploadEmits, McUploadProps } from "./types/mc-upload";
import type { UploadDropzoneInstance, UploadFileMap } from "./types";
import { ref } from "vue";
import McUploadDropzone from "./mc-upload-dropzone.vue";
import { ALLOW_FILE_TYPES } from "./constant";

// options
defineOptions({ name: "McUploadV2" });

// props
const props = withDefaults(defineProps<McUploadProps>(), {
  modelValue: () => [],
  downloadable: false,
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

// get file list
const fileList = (fileMap: UploadFileMap) => {
  return Array.from([...fileMap.values()]);
};

// handle upload
const handleUpload = (fileMap: UploadFileMap) => {
  console.log("upload: ", fileMap);
  const files = fileList(fileMap);
  emit("update:modelValue", files);
  emit("upload", files);
  emit("change", files);
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
</script>

<style scoped lang="scss">
@use "./styles/mc-upload.scss";
</style>
