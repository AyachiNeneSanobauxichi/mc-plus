<template>
  <div class="select-container">
    <input-group-container></input-group-container>
  </div>
</template>

<script setup lang="ts">
import InputGroupContainer from "./views/input-group-container.vue";
</script>

<style scoped lang="scss">
.select-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 800px;
}
</style>
