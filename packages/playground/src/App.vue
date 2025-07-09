<template>
  <div class="playground">
    <playground-drawer></playground-drawer>
  </div>
</template>

<script setup lang="ts">
import PlaygroundDrawer from "./views/mc-drawer/playground-drawer.vue";
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
