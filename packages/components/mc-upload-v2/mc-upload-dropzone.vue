<template>
  <div class="mc-upload-dropzone">
    <div class="mc-upload-dropzone-area">
      <slot name="area">
        <div class="mc-upload-dropzone-title">
          <slot name="title">
            <mc-icon :name="icon" />
            <span class="mc-upload-dropzone-title-text">{{ title }}</span>
          </slot>
        </div>
        <div class="mc-upload-dropzone-desc">
          <slot name="desc">
            <span>Max file size: 15MB</span>
            <span>JPG, JPEG, PNG, DOC, DOCX, XLS, XLSX and PDF only.</span>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadDropzoneProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "McUploadDropzone" });

// props
const props = withDefaults(defineProps<UploadDropzoneProps>(), {
  icon: "Document_Upload",
  title: "Click to upload or drag and drop your files here",
});
</script>

<style scoped lang="scss">
@use "./styles/mc-upload-dropzone.scss";
</style>
