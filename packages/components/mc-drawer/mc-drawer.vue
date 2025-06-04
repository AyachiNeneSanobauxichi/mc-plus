<template>
  <mc-overlay>
    <div class="mc-drawer">
      <div class="mc-drawer-header">Header</div>
      <div class="mc-drawer-body">Body</div>
      <div class="mc-drawer-footer">Footer</div>
    </div>
  </mc-overlay>
</template>

<script setup lang="ts">
import McOverlay from "../mc-overlay/mc-overlay.vue";

// options
defineOptions({ name: "McDrawer", inheritAttrs: false });
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
