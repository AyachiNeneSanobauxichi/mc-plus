<template>
  <div class="mc-upload" :style="{ width }">
    <div
      :class="[
        { 'mc-upload-wrapper': hasWrapper },
        `mc-upload-wrapper-${theme}`,
      ]"
    >
      <div class="mc-upload-content" v-if="hasWrapper">
        <div class="mc-upload-content-icon">
          <mc-icon name="Accept" v-if="!succeed" />
          <mc-success-icon v-else width="24px" height="24px" />
        </div>
        <div class="mc-upload-content-text">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="mc-upload-component">
        <div class="mc-upload-dropzone-wrapper" v-if="!disabled">
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
          >
            <template #default>
              <slot name="default"></slot>
            </template>
            <template #title>
              <slot name="title"></slot>
            </template>
            <template #desc>
              <slot name="desc"></slot>
            </template>
          </mc-upload-dropzone>
        </div>
        <div class="mc-upload-file-list-wrapper">
          <mc-file-list
            :model-value="modelValue"
            :allow-cancel="allowCancel"
            :downloadable="downloadable"
            :lang="lang"
            :theme="theme"
            :deletable="fileListDeletable"
            @update:model-value="handleUpdateModelValue"
            @preview="handlePreview"
            @delete="handleDelete"
            @download="handleDownload"
            @cancel="handleCancel"
          ></mc-file-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  McUploadEmits,
  McUploadProps,
  UploadInstance,
} from "./types/mc-upload";
import type {
  UploadDropzoneInstance,
  UploadFile,
  UploadFileMap,
} from "./types";
import { computed, reactive, ref, useSlots, watch } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";
import McIcon from "../mc-icon/mc-icon.vue";
import McSuccessIcon from "../mc-success-icon/mc-success-icon.vue";
import McUploadDropzone from "./mc-upload-dropzone.vue";
import McFileList from "./mc-file-list.vue";
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
  width: "100%",
  succeed: false,
  deletable: true,
  disabled: false,
});

// emits
const emit = defineEmits<McUploadEmits>();

// use width height hook
const { width } = useWidthHeight();

// slots
const slots = useSlots();

// has wrapper
const hasWrapper = computed(() => {
  return !!slots.content;
});

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
  uploadDropzoneRef.value?.clearUploadInput();
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

// clear files
const clearAllFile = () => {
  allFileMap.clear();
  emit("clear");
  emit("update:modelValue", []);
  emit("change", []);
};

// download files
const downloadAllFiles = () => {
  emit("download:all", getFileList(allFileMap));
};

// file list deletable
const fileListDeletable = computed(() => {
  return props.deletable && !props.disabled;
});

// expose
defineExpose<UploadInstance>({
  clearFiles: clearAllFile,
  downloadAllFiles,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-upload.scss";
</style>
