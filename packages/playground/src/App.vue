<template>
  <div class="playground">
    <playground-button></playground-button>
  </div>
</template>

<script setup lang="ts">
import playgroundButton from "./views/mc-button/playground-button.vue";
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
