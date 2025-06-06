<template>
  <div class="header-container">
    <mc-title title="Mc Title"></mc-title>
  </div>
</template>

<script setup lang="ts">
import McTitle from "../../../components/mc-title/mc-title.vue";
</script>

<style scoped lang="scss">
.header-container {
  width: 1200px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
