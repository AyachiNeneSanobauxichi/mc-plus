<template>
  <div class="playground">
    <playground-checkbox></playground-checkbox>
  </div>
</template>

<script setup lang="ts">
import PlaygroundCheckbox from "./views/mc-checkbox/playground-checkbox.vue";
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
  overflow: auto;
}
</style>
