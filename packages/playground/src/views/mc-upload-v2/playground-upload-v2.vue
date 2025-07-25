<template>
  <div class="playground-upload">
    <mc-upload-dropzone></mc-upload-dropzone>
  </div>
</template>

<script setup lang="ts">
// import McUploadV2 from "../../../../components/mc-upload-v2/mc-upload-v2.vue";
// import McFileListV2 from "../../../../components/mc-upload-v2/mc-file-list-v2.vue";
import McUploadDropzone from "../../../../components/mc-upload-v2/mc-upload-dropzone.vue";
</script>

<style scoped lang="scss">
.playground-upload {
  width: 80%;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
