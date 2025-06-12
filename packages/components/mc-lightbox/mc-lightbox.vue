<template>
  <div class="mc-lightbox">LightBox</div>
</template>

<script setup lang="ts">
import type { LightboxEmits, LightboxProps } from "./types";

// options
defineOptions({ name: "McLightbox" });

// props
withDefaults(defineProps<LightboxProps>(), {
  size: "medium",
  maskClosable: true,
  fixed: true,
  portCssSelector: "#app",
});

// emits
defineEmits<LightboxEmits>();
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
