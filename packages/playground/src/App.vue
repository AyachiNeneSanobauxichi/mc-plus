<template>
  <div class="playground">
    <playground-step></playground-step>
  </div>
</template>

<script setup lang="ts">
import PlaygroundStep from "./views/mc-step/playground-step.vue";
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
