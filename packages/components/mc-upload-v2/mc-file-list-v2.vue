<template>
  <ul class="mc-file-list" :class="`mc-file-list-${theme}`">
    <li v-for="file in modelValue" class="mc-file-list-item" :key="file.name">
      <div class="mc-file-list-item-file mc-file-list-item-info">
        <div class="mc-file-list-item-file-name" @click="handlePreview(file)">
          <mc-icon name="Document" />
          <span class="mc-file-list-item-file-name-text">{{ file.name }}</span>
        </div>
        <div class="mc-file-list-item-file-size" v-if="file.size">
          {{ getFileSize(file.size) }}
        </div>
      </div>
      <div class="mc-file-list-item-info">
        <span class="mc-file-list-item-label">
          {{ langMap.uploaded_by }}
        </span>
        <span class="mc-file-list-item-value">
          {{ file.uploadBy || "--" }}
        </span>
      </div>
      <div class="mc-file-list-item-info">
        <span class="mc-file-list-item-label">
          {{ langMap.uploaded_on }}
        </span>
        <span class="mc-file-list-item-value">
          {{ formatDate(file.uploadTime) || "--" }}
        </span>
      </div>
      <div class="mc-file-list-item-actions">
        <template v-if="file.status === 'loading'">
          <mc-icon
            name="Cross"
            class="mc-file-list-item-icon"
            @click="handleCancel(file)"
          />
        </template>
        <template v-else>
          <mc-icon
            name="Download"
            class="mc-file-list-item-icon"
            @click="handleDownload(file)"
            v-if="downloadable"
          />
          <mc-icon
            name="Trash"
            class="mc-file-list-item-icon"
            @click="handleDelete(file)"
          />
        </template>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { FileListV2Emits, FileListV2Props } from "./types/mc-file-list";
import type { UploadFile } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { formatDate, getFileSize } from "./utils";
import { useLang } from "./hooks";

// options
defineOptions({ name: "McFileListV2" });

// props
const props = withDefaults(defineProps<FileListV2Props>(), {
  modelValue: () => [],
  theme: "light",
  lang: "en",
  downloadable: false,
});

// emits
const emit = defineEmits<FileListV2Emits>();

// lang
const { langMap } = useLang(props.lang);

// preview
const handlePreview = (file: UploadFile) => {
  emit("preview", file);
};

// cancel
const handleCancel = (file: UploadFile) => {
  emit("cancel", file);
};

// download
const handleDownload = (file: UploadFile) => {
  emit("download", file);
};

// delete
const handleDelete = (file: UploadFile) => {
  emit("delete", file);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-file-list.scss";
</style>
