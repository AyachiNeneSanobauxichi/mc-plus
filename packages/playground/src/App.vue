<template>
  <div class="select-container">
    <select-container />
  </div>
</template>

<script setup lang="ts">
import SelectContainer from "./views/select-container.vue";
</script>

<style scoped lang="scss">
.select-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: pink;
  width: 1000px;
  height: 800px;
}
</style>
