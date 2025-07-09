<template>
  <div class="playground">
    <playground-icon></playground-icon>
  </div>
</template>

<script setup lang="ts">
import PlaygroundIcon from "./views/mc-icon/playground-icon.vue";
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
