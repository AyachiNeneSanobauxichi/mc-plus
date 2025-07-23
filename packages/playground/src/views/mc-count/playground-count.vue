<template>
  <div class="playground-count">
    <mc-count></mc-count>
  </div>
</template>

<script setup lang="ts">
import McCount from "../../../../components/mc-count/mc-count.vue";
</script>

<style scoped lang="scss">
.playground-count {
  width: 800px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
