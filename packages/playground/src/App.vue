<template>
  <div class="playground">
    <playground-table></playground-table>
  </div>
</template>

<script setup lang="ts">
import PlaygroundTable from "./views/mc-table/playground-table.vue";
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
