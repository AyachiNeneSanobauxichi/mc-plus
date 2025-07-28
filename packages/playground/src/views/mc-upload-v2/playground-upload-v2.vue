<template>
  <div class="playground-upload">
    <mc-upload-v2
      v-model="fileList"
      :allowed-file-types="['png']"
      upload-user="Hirasawa Yui"
      @upload="handleUpload"
      @preview="handlePreview"
      @delete="handleDelete"
      @download="handleDownload"
      @cancel="handleCancel"
    ></mc-upload-v2>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from "../../../../components/mc-upload-v2/types";
import { ref } from "vue";
import McUploadV2 from "../../../../components/mc-upload-v2/mc-upload-v2.vue";

// file list
const fileList = ref<UploadFile[]>([]);

const handleUpload = (files: UploadFile[]) => {
  console.log("Upload Files: ", files);
  uploadApi(files);
};

// upload api
const uploadApi = (files: UploadFile[]) => {
  setTimeout(() => {
    fileList.value = files.map((file) => {
      if (file.status === "loading") {
        return { ...file, status: "successed", progress: 100 };
      } else {
        return file;
      }
    });
  }, 3000);
};

const handlePreview = (file: UploadFile) => {
  console.log("Preview File: ", file);
};

const handleDelete = (file: UploadFile) => {
  console.log("Delete File: ", file);
};

const handleDownload = (file: UploadFile) => {
  console.log("Download File: ", file);
};

const handleCancel = (file: UploadFile) => {
  console.log("Cancel File: ", file);
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
