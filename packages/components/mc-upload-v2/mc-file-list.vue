<template>
  <ul
    class="mc-file-list"
    :class="[`mc-file-list-${theme}`, { 'mc-file-list-compact': isCompact }]"
    ref="fileListRef"
  >
    <li v-for="file in modelValue" class="mc-file-list-item" :key="file.name">
      <div class="mc-file-list-item-content">
        <div class="mc-file-list-item-file mc-file-list-item-info">
          <div class="mc-file-list-item-file-name" @click="handlePreview(file)">
            <mc-icon name="Document" />
            <span class="mc-file-list-item-file-name-text">{{
              file.name
            }}</span>
          </div>
          <div class="mc-file-list-item-file-desc">
            <template v-if="file.status !== 'failed'">
              <span class="mc-file-list-item-file-size-text">
                {{ file.size ? getFileSize(file.size) : "--" }}
              </span>
              <div
                class="mc-file-list-item-file-progress-bar"
                v-if="file.status === 'loading'"
              >
                <mc-progress-bar
                  :percentage="file.progress"
                  :transition-duration="1000"
                />
              </div>
            </template>
            <template v-else>
              <span class="mc-file-list-item-file-error">
                {{ file.errorMessage || "failed to upload" }}
              </span>
            </template>
          </div>
        </div>
        <template v-if="!isCompact">
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
        </template>
        <div class="mc-file-list-item-actions">
          <template v-if="file.status === 'loading'">
            <mc-icon
              v-if="allowCancel"
              name="Cross"
              class="mc-file-list-item-icon"
              @click="handleCancel(file)"
            />
            <div v-else :style="{ width: '24px', height: '24px' }"></div>
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
      </div>
      <template v-if="isCompact">
        <mc-divider />
        <div class="mc-file-list-item-compact-content">
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
        </div>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { FileListEmits, FileListProps } from "./types/mc-file-list";
import type { UploadFile } from "./types";
import { ref } from "vue";
import { useResizeObserver } from "@mc-plus/hooks";
import McIcon from "../mc-icon/mc-icon.vue";
import McDivider from "../mc-divider/mc-divider.vue";
import McProgressBar from "../mc-progress-bar/mc-progress-bar.vue";
import { formatDate, getFileSize } from "./utils";
import { useLang } from "./hooks";

// options
defineOptions({ name: "McFileListV2" });

// props
const props = withDefaults(defineProps<FileListProps>(), {
  modelValue: () => [],
  theme: "light",
  lang: "en",
  downloadable: false,
  allowCancel: false,
});

// emits
const emit = defineEmits<FileListEmits>();

// lang
const { langMap } = useLang(props.lang);

// is compact
const isCompact = ref<boolean>(false);

// file list ref
const fileListRef = ref<HTMLUListElement>();

// use observer
useResizeObserver(fileListRef, ({ width }) => {
  isCompact.value = width <= 600;
});

// preview
const handlePreview = (file: UploadFile) => {
  emit("preview", file);
};

// cancel
const handleCancel = (file: UploadFile) => {
  emit("cancel", file);
  removeFile(file);
};

// download
const handleDownload = (file: UploadFile) => {
  emit("download", file);
};

// delete
const handleDelete = (file: UploadFile) => {
  emit("delete", file);
  removeFile(file);
};

// remove file
const removeFile = (file: UploadFile) => {
  emit(
    "update:modelValue",
    props.modelValue.filter((f) => f.name !== file.name)
  );
};
</script>

<style scoped lang="scss">
@use "./styles/mc-file-list.scss";
</style>
