<template>
  <div class="playground">
    <playground-input></playground-input>
  </div>
</template>

<script setup lang="ts">
import PlaygroundInput from "./views/mc-input/playground-input.vue";
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
