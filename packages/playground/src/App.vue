<template>
  <div class="playground">
    <lightbox-container></lightbox-container>
  </div>
</template>

<script setup lang="ts">
import LightboxContainer from "./views/lightbox-container.vue";
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
