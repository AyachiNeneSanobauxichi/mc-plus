<template>
  <div class="playground">
    <playground-tag></playground-tag>
  </div>
</template>

<script setup lang="ts">
import PlaygroundTag from "./views/mc-tag/playground-tag.vue";
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
