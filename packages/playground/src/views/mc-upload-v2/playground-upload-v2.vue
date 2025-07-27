<template>
  <div class="playground-upload">
    <!-- 
    <mc-file-list-v2
      v-model="fileList"
      @preview="handlePreview"
      @delete="handleDelete"
      @download="handleDownload"
      @cancel="handleCancel"
    ></mc-file-list-v2> -->
    <mc-upload-v2
      v-model="fileList"
      :allowed-file-types="['png']"
      @upload="handleUpload"
    ></mc-upload-v2>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from "../../../../components/mc-upload-v2/types";
import { ref, watchEffect } from "vue";
import McUploadV2 from "../../../../components/mc-upload-v2/mc-upload-v2.vue";
// import McFileListV2 from "../../../../components/mc-upload-v2/mc-file-list-v2.vue";

// file list
const fileList = ref<UploadFile[]>([]);

watchEffect(() => {
  console.log("fileList: ", fileList.value);
});

const handleUpload = (files: UploadFile[]) => {
  console.log("Upload Files: ", files);
  // fileList.value = [...fileList.value, ...Array.from(fileMap.values())];

  // setTimeout(() => {
  //   fileList.value = fileList.value.map((file) => {
  //     return { ...file, progress: 99 };
  //   });
  // }, 100);

  // setTimeout(() => {
  //   fileList.value = fileList.value.map((file) => {
  //     if (file.status === "loading") {
  //       return { ...file, status: "successed" };
  //     }
  //     return file;
  //   });
  // }, 6000);
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
