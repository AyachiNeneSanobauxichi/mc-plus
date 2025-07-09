<template>
  <div class="playground">
    <playground-step-v2></playground-step-v2>
  </div>
</template>

<script setup lang="ts">
import playgroundStepV2 from "./views/mc-step-v2/playground-step-v2.vue";
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
