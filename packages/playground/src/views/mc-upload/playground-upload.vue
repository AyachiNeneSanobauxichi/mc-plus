<template>
  <div class="playground-upload">
    <div class="btn-groups">
      <mc-button @click="handleClear">Clear</mc-button>
      <mc-button @click="handleChangeLang">Change Lang</mc-button>
    </div>
    <mc-upload
      ref="uploadRef"
      v-model="fileList"
      :allowed-file-types="['png']"
      upload-user="Hirasawa Yui"
      :lang="lang"
      @upload="handleUpload"
      @preview="handlePreview"
      @delete="handleDelete"
      @download="handleDownload"
      @cancel="handleCancel"
    >
      <template #content>
        <span>Latest 3 months’ original computerized salary slips; or</span>
        <span>Latest Notice of Assessment</span>
      </template>
    </mc-upload>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile, UploadInstance, UploadLang } from "mc-plus";
import { ref } from "vue";
import McUpload from "../../../../components/mc-upload/mc-upload.vue";
import { McButton } from "mc-plus";

// file list
const fileList = ref<UploadFile[]>([]);

const handleUpload = (files: UploadFile[]) => {
  console.log("Upload Files: ", files);
  // use api to upload files
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

// upload ref
const uploadRef = ref<UploadInstance>();

const handleClear = () => {
  uploadRef.value?.clearFiles();
};

const lang = ref<UploadLang>("en");

const handleChangeLang = () => {
  lang.value = lang.value === "en" ? "zh" : "en";
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
  // background-color: pink;

  .btn-groups {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
  }
}
</style>
