<template>
  <div class="divider-container">
    <mc-divider emphasis="bold" orientation="vertical" />
  </div>
</template>

<script setup lang="ts">
import McDivider from "../../../components/mc-divider/mc-divider.vue";
</script>

<style scoped lang="scss">
.divider-container {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgreen;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
