<template>
  <div class="playground-upload">
    <section class="tool-bar">
      <div class="display">
        <span>fileIdList: {{ fileIdList }}</span>
      </div>
      <div class="btn-group">
        <mc-button @click="handleInit">Init</mc-button>
      </div>
    </section>
    <section class="business-upload-wrapper">
      <mc-business-upload
        v-model="fileIdList"
        upload-user="Hirasawa Yui"
      ></mc-business-upload>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McBusinessUpload from "./mc-business-upload/index.vue";

// file id list
const fileIdList = ref<number[]>([53356]);

// handle init
const handleInit = () => {
  fileIdList.value = [53356];
};
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
