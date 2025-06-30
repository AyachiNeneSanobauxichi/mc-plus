<template>
  <div class="playground-toast">
    <div class="tool-bar">
      <mc-button @click="toast.success('Success')">Success</mc-button>
      <mc-button @click="toast.error('Error')">Error</mc-button>
      <mc-button @click="toast.warning('Warning')">Warning</mc-button>
      <mc-button @click="toast.info('Info')">Info</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "@mc-plus/components/mc-toast/toast";
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
