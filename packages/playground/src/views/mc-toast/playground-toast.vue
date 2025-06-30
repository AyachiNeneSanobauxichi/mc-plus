<template>
  <div class="playground-toast">
    <div class="tool-bar">
      <mc-button @click="toastSuccess('Success')">Success</mc-button>
      <mc-button @click="toastError('Error')">Error</mc-button>
      <mc-button @click="toastWarning('Warning')">Warning</mc-button>
      <mc-button @click="toastInfo('Info')">Info</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
} from "@mc-plus/components/mc-toast/toast";
import McButton from "../../../../components/mc-button/mc-button.vue";
</script>

<style scoped lang="scss">
.playground-toast {
  .tool-bar {
    position: absolute;
    display: flex;
    gap: 16px;
    bottom: 0;
  }
}
</style>
