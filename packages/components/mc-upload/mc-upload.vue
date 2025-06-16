<template>
  <div
    class="mc-upload"
    :class="{ dragover: isDragover }"
    @click="handleUploadClick"
    @dragover.prevent
    @drop.prevent="handleDropFiles"
  >
    <div
      class="cover"
      @dragenter="isDragover = true"
      @dragleave="isDragover = false"
    ></div>
    <div class="upload">
      <div v-show="!hiddenIcon">
        <svg
          class="upload-icon"
          width="32"
          height="38"
          viewBox="0 0 32 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.7647 16.5V10.3334C27.7647 7.53311 27.7647 6.13298 27.2518 5.06342C26.8006 4.12261 26.0807 3.35771 25.1952 2.87834C24.1886 2.33337 22.8708 2.33337 20.2353 2.33337H10.1961C7.56053 2.33337 6.24276 2.33337 5.23612 2.87834C4.35065 3.35771 3.63074 4.12261 3.17957 5.06342C2.66666 6.13298 2.66666 7.53311 2.66666 10.3334V27.6667C2.66666 30.467 2.66666 31.8671 3.17957 32.9367C3.63074 33.8775 4.35065 34.6424 5.23612 35.1217C6.24276 35.6667 7.56053 35.6667 10.1961 35.6667H15.2157M18.3529 17.3334H8.94117M12.0784 24H8.94117M21.4902 10.6667H8.94117M24.6274 34V24M19.9216 29H29.3333"
            stroke-width="4"
            stroke-linecap="square"
          />
        </svg>
      </div>
      <div class="desc">
        <slot>
          <p class="title" :class="{ 'hidden-icon': hiddenIcon }">
            {{ UPLOAD_TEXT_EH.upload_note }}
          </p>
          <p v-show="fileSizeLimit > 0">
            {{ UPLOAD_TEXT_EH.max_size }} {{ getFileSize(fileSizeLimit) }}
          </p>
          <p>{{ UPLOAD_TEXT_EH.max_count }}</p>
        </slot>
      </div>
    </div>
    <input
      ref="uploadFileRef"
      type="file"
      multiple
      style="display: none"
      @change="handleFileChange"
    />
  </div>
  <transition name="file-list-show">
    <template v-if="allFileList?.length">
      <FileList
        class="file-list-show"
        :files="allFileList"
        @delete-file="handleFileDelete"
        needDelete
      />
    </template>
  </transition>
</template>

<script setup lang="ts">
import type {
  UploadEmits,
  UploadFile,
  UploadInstance,
  UploadProps,
} from "./types";
import { computed, reactive, ref } from "vue";
import { changeSizeStringToNumber, getFileSize } from "./utils";
import { UPLOAD_TEXT_EH, WILDCARD } from "./constanst";
import { isFunction } from "lodash-es";

// options
defineOptions({ name: "McUpload" });

// props
const props = withDefaults(defineProps<UploadProps>(), {
  fileSize: () => 1024 * 1024 * 15,
  fileCount: 0,
  hiddenIcon: false,
  uploadUser: "--",
});

// emits
const emits = defineEmits<UploadEmits>();

// refs
const uploadFileRef = ref<HTMLInputElement>();

// drag file
const isDragover = ref<boolean>(false);
// files
const allFileMap = reactive<Map<string, UploadFile>>(new Map());
const allFileList = computed(() => [...allFileMap.values()]);

// click to upload
const handleUploadClick = () => {
  uploadFileRef.value!.click();
};

// drop files
const handleDropFiles = (e: DragEvent) => {
  isDragover.value = false;
  const droppedFiles = e.dataTransfer?.files;
  if (!droppedFiles) return;
  uploadFiles(droppedFiles);
};

// files change
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;
  uploadFiles(files);
};

// file upload
const uploadFiles = async (files: FileList) => {
  let fileArray = Array.from(files);

  // check file count
  fileArray = validateFileCount(fileArray);
  // check file type
  fileArray = validateFileType(fileArray);
  if (!fileArray.length) {
    if (uploadFileRef.value) {
      uploadFileRef.value.value = "";
    }
    return;
  }

  fileArray.forEach((file: File) => {
    allFileMap.set(file.name, {
      name: file.name,
      size: file.size,
      status: "loading",
      uploadBy: props.uploadUser,
      uploadTime: Date.now(),
    });
  });

  // check file size
  if (!validateFileSize(fileArray)) {
    if (uploadFileRef.value) {
      uploadFileRef.value.value = "";
    }
    return;
  }

  // upload queue
  const uploadQueue = [];
  for (const file of fileArray) {
    if (
      allFileMap.has(file.name) &&
      allFileMap.get(file.name)!.status === "loading"
    ) {
      uploadQueue.push(uploadApi(file));
    }
  }

  // upload
  const res = await Promise.allSettled(uploadQueue);
  for (let i = 0; i < res.length; i++) {
    const currentfile = fileArray[i];
    if (res[i].status === "fulfilled") {
      const fid = (res[i] as { value: { id: number } })?.value?.id;
      allFileMap.set(currentfile.name, {
        fid,
        name: currentfile.name,
        size: currentfile.size,
        status: "successed",
        uploadBy: props.uploadUser,
        uploadTime: Date.now(),
      });
    } else {
      const errorMessage =
        (res[i] as { reason: { message: string } })?.reason?.message ||
        "Upload failed";
      allFileMap.set(currentfile.name, {
        name: currentfile.name,
        size: currentfile.size,
        status: "failed",
        errorMessage,
        uploadBy: props.uploadUser,
        uploadTime: Date.now(),
      });
    }
  }

  emitUploadEvent();
};

// file size
const fileSizeLimit = computed(() => {
  if (typeof props.fileSize === "number") {
    return props.fileSize;
  } else if (typeof props.fileSize === "string") {
    return changeSizeStringToNumber(props.fileSize);
  } else {
    return -1;
  }
});

// check file count
const validateFileCount = (files: File[]) => {
  const uploadCount = files.length;
  if (props.fileCount && uploadCount + allFileMap.size > props.fileCount) {
    files = files.slice(0, props.fileCount - allFileMap.size);
    emits("error:count");
  }

  return files;
};

// check file type
const validateFileType = (files: File[]) => {
  const allowTypes = props.allowedFileTypes;
  if (allowTypes?.length) {
    const allowedTypes = allowTypes.map((type: string) => type.toUpperCase());
    const _files = files.filter((file: File) => {
      const fileType = file.name.split(".").pop()?.toUpperCase() ?? "--";
      return allowedTypes.includes(fileType);
    });

    if (_files.length !== files.length) {
      emits("error:size");
    }
    files = _files;
  }

  return files;
};

// check file size
const validateFileSize = (files: File[]) => {
  const maxSize = fileSizeLimit.value;
  if (maxSize <= 0) return true;
  let res = false;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > maxSize) {
      allFileMap.set(file.name, {
        name: file.name,
        size: file.size,
        status: "failed",
        errorMessage: UPLOAD_TEXT_EH.limit_size.replace(
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

// emit upload event
const emitUploadEvent = () => {
  const supportFiles = [...allFileMap.values()]
    .filter((file: UploadFile) => file.status === "successed")
    .map((file: UploadFile) => file.fid!);
  emits("upload", supportFiles);
  emits("update:files", supportFiles);
};

// upload api
const uploadApi = async (file: File) => {
  if (isFunction(props.uploadFunc)) {
    return await props.uploadFunc(file);
  } else {
    return Promise.reject("UploadFunc is not a function");
  }
};

// delete file
const handleFileDelete = (fileName: string) => {
  allFileMap.delete(fileName);
  // clear input for next upload the same file
  if (uploadFileRef.value) {
    uploadFileRef.value.value = "";
  }
  emitUploadEvent();
};

// clear files
const clearFiles = () => {
  allFileMap.clear();
  if (uploadFileRef.value) {
    uploadFileRef.value.value = "";
  }
  emitUploadEvent();
};

// expose
defineExpose<UploadInstance>({
  uploadInputRef: uploadFileRef,
  clear: clearFiles,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-upload.scss";
</style>
