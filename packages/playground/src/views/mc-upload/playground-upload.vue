<template>
  <div class="playground-upload">
    <div>
      <div class="display">
        <div>files: {{ files }}</div>
        <div class="tool-bar">
          <mc-button @click="handleClearFiles">Clear</mc-button>
          <mc-button @click="handleUploadFile">New File</mc-button>
          <mc-button @click="handleChangeTheme">Change Theme</mc-button>
        </div>
      </div>
      <div>
        <mc-upload
          v-model="files"
          ref="UploadRef"
          :upload-func="uploadFile"
          upload-user="Hirasawa Yui"
          @review:file="handleReview"
        ></mc-upload>
      </div>
      <div class="file-list">
        <mc-file-list
          :files="files"
          :theme="theme"
          :deletable="false"
        ></mc-file-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  FileListTheme,
  UploadFile,
  UploadFunc,
} from "@mc-plus/components/mc-upload/types";
import McUpload from "../../../../components/mc-upload/mc-upload.vue";
import McFileList from "../../../../components/mc-upload/mc-file-list.vue";
import { ref } from "vue";
import { McButton } from "mc-plus";

const files = ref<UploadFile[]>([]);

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

const UploadRef = ref<typeof McUpload>();

const handleReview = (file: UploadFile) => {
  console.log("Review file: ", file);
};

const handleClearFiles = () => {
  UploadRef.value!.clear();
};

const handleUploadFile = () => {
  files.value.push({
    fid: generateRandom8DigitNumber(),
    name: `${generateRandom8DigitNumber()} File`,
    size: 1024 * 8,
    uploadBy: "Akiyama Mio",
    uploadTime: Date.now(),
    status: "successed",
  });
};

const theme = ref<FileListTheme>("white");

const handleChangeTheme = () => {
  theme.value = theme.value === "grey" ? "white" : "grey";
};
</script>

<style scoped lang="scss">
.playground-upload {
  margin-top: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  .display {
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;

    .tool-bar {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
    }
  }

  .file-list {
    margin-top: 200px;
  }
}
</style>
