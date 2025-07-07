<template>
  <div class="playground">
    <playground-drawer></playground-drawer>
  </div>
</template>

<script setup lang="ts">
import PlaygroundDrawer from "./views/mc-drawer/playground-drawer.vue";
</script>

<style scoped lang="scss">
body,
html {
  height: 100vh;
}

.playground {
  width: 1800px;
  height: 1000px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
}
</style>
