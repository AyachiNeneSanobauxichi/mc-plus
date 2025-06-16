<template>
  <div class="upload-container">
    <mc-upload
      :upload-func="uploadFile"
      upload-user="Hirasawa Yui"
      @review:file="handleReview"
    ></mc-upload>
  </div>
</template>

<script setup lang="ts">
import type {
  UploadFile,
  UploadFunc,
} from "@mc-plus/components/mc-upload/types";
import McUpload from "../../../components/mc-upload/mc-upload.vue";

const uploadFile: UploadFunc = async (file: File) => {
  console.log("File: ", file);
  await delay();
  return { fid: generateRandom8DigitNumber() } as UploadFile;
};

const generateRandom8DigitNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

const delay = (timer: number = 2000) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("");
    }, timer);
  });
};

const handleReview = (file: UploadFile) => {
  console.log("Review file: ", file);
};
</script>

<style scoped lang="scss">
.upload-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
