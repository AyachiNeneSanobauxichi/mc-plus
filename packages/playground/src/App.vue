<template>
  <div class="playground">
    <playground-alert-message></playground-alert-message>
  </div>
</template>

<script setup lang="ts">
import PlaygroundAlertMessage from "./views/mc-alert-message/playground-alert-message.vue";
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
