<template>
  <div class="playground">
    <playground-secondary-menu></playground-secondary-menu>
  </div>
</template>

<script setup lang="ts">
import PlaygroundSecondaryMenu from "./views/mc-secondary-menu/playground-secondary-menu.vue";
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
