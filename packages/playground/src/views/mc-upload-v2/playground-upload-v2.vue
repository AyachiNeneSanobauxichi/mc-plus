<template>
  <div class="playground-upload">
    <mc-upload-dropzone
      upload-user="Hirasawa Yui"
      @upload="handleUpload"
      @error:type="handleErrorType"
      @error:size="handleErrorSize"
    ></mc-upload-dropzone>
  </div>
</template>

<script setup lang="ts">
// import McUploadV2 from "../../../../components/mc-upload-v2/mc-upload-v2.vue";
// import McFileListV2 from "../../../../components/mc-upload-v2/mc-file-list-v2.vue";
import McUploadDropzone from "../../../../components/mc-upload-v2/mc-upload-dropzone.vue";
import type { UploadFileMap } from "../../../../components/mc-upload-v2/types";

const handleUpload = (fileMap: UploadFileMap) => {
  console.log("File Map: ", fileMap);
};

const handleErrorType = (fileName: string) => {
  console.log("Error Type: ", fileName);
};

const handleErrorSize = (fileName: string) => {
  console.log("Error Size: ", fileName);
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
