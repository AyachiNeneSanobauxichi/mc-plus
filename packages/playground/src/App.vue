<template>
  <div class="playground">
    <playground-step></playground-step>
  </div>
</template>

<script setup lang="ts">
import PlaygroundStep from "./views/mc-step/playground-step.vue";
</script>

<style scoped lang="scss">
.playground {
  :deep(.playground-center) {
    position: fixed;
    width: 1200px;
    height: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
