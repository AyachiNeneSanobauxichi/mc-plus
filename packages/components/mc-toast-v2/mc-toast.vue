<template>
  <div class="mc-toast">
    <div class="mc-toact-msg-container">
      <div class="mc-toast-msg-icon"></div>
      <div class="mc-toast-msg-text">
        <slot>{{ message }}</slot>
      </div>
      <div class="mc-toast-countdown"></div>
      <div class="mc-toast-msg-close"></div>
    </div>
    <div class="mc-toast-content-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToastProps } from "./types";

// options
defineOptions({ name: "McToast" });

// props
const props = withDefaults(defineProps<ToastProps>(), {
  type: "info",
  closable: true,
  autoClose: true,
  duration: 3000,
  hideIcon: false,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
