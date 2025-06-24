<template>
  <div class="playground">
    <playground-tab></playground-tab>
  </div>
</template>

<script setup lang="ts">
import PlaygroundTab from "./views/mc-tab/playground-tab.vue";
</script>

<style scoped lang="scss">
body,
html {
  height: 100vh;
}

.playground {
  width: 1800px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
