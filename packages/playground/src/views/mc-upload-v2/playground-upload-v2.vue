<template>
  <div class="playground-upload">
    <mc-upload-dropzone
      upload-user="Hirasawa Yui"
      @upload="handleUpload"
      @error:type="handleErrorType"
      @error:size="handleErrorSize"
    ></mc-upload-dropzone>
    <mc-file-list-v2
      :model-value="fileList"
      @preview="handlePreview"
      @delete="handleDelete"
      @download="handleDownload"
      @cancel="handleCancel"
    ></mc-file-list-v2>
  </div>
</template>

<script setup lang="ts">
// import McUploadV2 from "../../../../components/mc-upload-v2/mc-upload-v2.vue";
import type {
  UploadFile,
  UploadFileMap,
} from "../../../../components/mc-upload-v2/types";
import { ref } from "vue";
import McFileListV2 from "../../../../components/mc-upload-v2/mc-file-list-v2.vue";
import McUploadDropzone from "../../../../components/mc-upload-v2/mc-upload-dropzone.vue";

// file list
const fileList = ref<UploadFile[]>([]);

const handleUpload = (fileMap: UploadFileMap) => {
  fileList.value = Array.from(fileMap.values());
  console.log("File Map: ", fileMap);
};

const handleErrorType = (fileName: string) => {
  console.log("Error Type: ", fileName);
};

const handleErrorSize = (fileName: string) => {
  console.log("Error Size: ", fileName);
};

const handlePreview = (file: UploadFile) => {
  console.log("Preview: ", file);
};

const handleDelete = (file: UploadFile) => {
  console.log("Delete: ", file);
};

const handleDownload = (file: UploadFile) => {
  console.log("Download: ", file);
};

const handleCancel = (file: UploadFile) => {
  console.log("Cancel: ", file);
};
</script>

<style scoped lang="scss">
.playground-upload {
  width: 80%;
  height: 50vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
