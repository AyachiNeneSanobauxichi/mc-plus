<template>
  <div class="playground-upload">
    <section class="tool-bar">
      <div class="display">
        <span>fileIdList: {{ fileIdList }}</span>
      </div>
      <div class="btn-group">
        <mc-button @click="handleClear">Clear</mc-button>
        <mc-button @click="handleChangeLang">Change Lang</mc-button>
      </div>
    </section>
    <section class="business-upload-wrapper">
      <mc-business-upload
        v-model="fileIdList"
        upload-user="Hirasawa Yui"
      ></mc-business-upload>
    </section>
    <!-- <mc-upload
      ref="uploadRef"
      v-model="fileList"
      upload-user="Hirasawa Yui"
      :lang="lang"
      @upload="handleUpload"
      @preview="handlePreview"
      @delete="handleDelete"
      @download="handleDownload"
      @cancel="handleCancel"
    >
    </mc-upload> -->
    <!-- <template #content>
    <span>Latest 3 months’ original computerized salary slips; or</span>
    <span>Latest Notice of Assessment</span>
  </template> -->
  </div>
</template>

<script setup lang="ts">
import type { UploadFile, UploadInstance, UploadLang } from "mc-plus";
import { ref } from "vue";
import { McButton } from "mc-plus";
import McBusinessUpload from "./mc-business-upload/index.vue";

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

// ===========================================================================================

// file id list
const fileIdList = ref<string[]>([]);
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

.playground-upload {
  @include mixin.flex-center($direction: column, $gap: 32px);

  .tool-bar {
    @include mixin.flex-center(column, flex-start, flex-start, 16px);
    .btn-group {
      @include mixin.flex-center($justify: flex-start, $gap: 8px);
    }
  }

  .business-upload-wrapper {
    max-width: 1600px;
    width: 100%;
  }
}
</style>
