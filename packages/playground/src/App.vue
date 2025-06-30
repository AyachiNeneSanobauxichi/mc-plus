<template>
  <div class="playground">
    <playground-toast></playground-toast>
  </div>
</template>

<script setup lang="ts">
import PlaygroundToast from "./views/mc-toast/playground-toast.vue";
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
