<template>
  <div class="playground">
    <playground-status></playground-status>
  </div>
</template>

<script setup lang="ts">
import PlaygroundStatus from "./views/mc-status/playground-status.vue";
</script>

<style scoped lang="scss">
body,
html {
  height: 100vh;
}

.playground {
  width: 800px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
