<template>
  <ul class="mc-file-list" ref="fileContainerRef">
    <transition-group name="file-list" tag="ul">
      <li
        class="file-item"
        v-for="file in files"
        :key="file.name"
        :class="file.status"
      >
        <div class="file-info-container">
          <!-- file name -->
          <div class="file-name file-info">
            <div class="file" @click="handleReview(file)">
              <template v-if="file.status === 'loading'">
                <mc-icon name="Loading" class="loading-icon" />
              </template>
              <template v-else>
                <mc-icon name="Document" />
              </template>
              <span class="file-name-text">{{ file.name }}</span>
            </div>
            <template v-if="file.status === 'failed'">
              <div class="size error-info">{{ file.errorMessage }}</div>
            </template>
            <template v-else>
              <div class="size">
                {{ file.size ? getFileSize(file.size) : "" }}
              </div>
            </template>
          </div>
          <template v-if="file.status !== 'loading'">
            <!-- upload successed -->
            <template v-if="!isCompact && file.status === 'successed'">
              <!-- upload by -->
              <div class="file-info">
                <div class="label">{{ UPLOAD_TEXT_EH.uploaded_by }}</div>
                <div class="content">{{ file.uploadBy }}</div>
              </div>
              <!-- upload on -->
              <div class="file-info">
                <div class="label">{{ UPLOAD_TEXT_EH.uploaded_on }}</div>
                <div class="content">{{ formatDate(file.uploadTime) }}</div>
              </div>
              <!-- delete icon -->
            </template>
            <template v-if="deletable">
              <div class="delete" @click="handleDeleteClick(file)">
                <mc-icon name="Trash" />
              </div>
            </template>
          </template>
        </div>
        <template v-if="isCompact && file.status === 'successed'">
          <!-- compact layout -->
          <div class="compact-container">
            <!-- upload by -->
            <div class="file-info">
              <div class="label">{{ UPLOAD_TEXT_EH.uploaded_by }}</div>
              <div class="content">{{ file.uploadBy }}</div>
            </div>
            <!-- upload on -->
            <div class="file-info">
              <div class="label">{{ UPLOAD_TEXT_EH.uploaded_on }}</div>
              <div class="content">{{ formatDate(file.uploadTime) }}</div>
            </div>
          </div>
        </template>
      </li>
    </transition-group>
  </ul>
</template>

<script setup lang="ts">
import type { FileListEmits, FileListProps, UploadFile } from "./types";
import { ref } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import { getFileSize, formatDate } from "./utils";
import { UPLOAD_TEXT_EH } from "./constanst";
import useResizeObserver from "@mc-plus/hooks/useResizeObserver";

// options
defineOptions({ name: "McFileList" });

// props
withDefaults(defineProps<FileListProps>(), {
  files: () => [],
  deletable: true,
});

// emits
const emits = defineEmits<FileListEmits>();

// file container ref
const fileContainerRef = ref<HTMLDivElement>();
// compact
const isCompact = ref<boolean>(false);

// observer width
useResizeObserver(fileContainerRef, ({ width }) => {
  isCompact.value = width <= 600;
});

// click delete
const handleDeleteClick = (file: UploadFile) => {
  emits("delete:file", file);
};

// click review
const handleReview = async (file: UploadFile) => {
  emits("review:file", file);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-file-list.scss";
</style>
