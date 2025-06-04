<template>
  <mc-overlay>
    <div class="mc-drawer">
      <div class="mc-drawer-header">
        <mc-modal-header :title="title" />
      </div>
      <div class="mc-drawer-content-wrapper">
        <div class="mc-drawer-content"></div>
      </div>
      <div class="mc-drawer-footer">Footer</div>
    </div>
  </mc-overlay>
</template>

<script setup lang="ts">
import type { DrawerProps } from "./types";
import McOverlay from "../mc-overlay/mc-overlay.vue";
import McModalHeader from "../mc-modal-header/mc-modal-header.vue";
import McFooter from "../mc-footer/mc-footer.vue";

// options
defineOptions({ name: "McDrawer" });

// props
withDefaults(defineProps<DrawerProps>(), {
  size: "large",
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
