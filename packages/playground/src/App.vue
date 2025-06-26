<template>
  <div class="playground">
    <playground-step-v2></playground-step-v2>
  </div>
</template>

<script setup lang="ts">
import PlaygroundStepV2 from "./views/mc-step-v2/playground-step-v2.vue";
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
