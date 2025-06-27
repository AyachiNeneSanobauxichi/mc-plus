<template>
  <div class="playground">
    <mc-button-playground></mc-button-playground>
  </div>
</template>

<script setup lang="ts">
import McButtonPlayground from "./views/mc-button/mc-button.vue";
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
