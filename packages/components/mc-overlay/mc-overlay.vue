<template>
  <div class="mc-overlay">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// options
defineOptions({ name: "McOverlay", inheritAttrs: false });
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
