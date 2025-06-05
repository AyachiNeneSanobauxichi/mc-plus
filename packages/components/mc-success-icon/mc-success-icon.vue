<template>
  <svg class="success-icon" :style="{ width, height }" viewBox="0 0 400 400">
    <circle
      class="circle"
      fill="none"
      transform="rotate(-90 200 200)"
      stroke-width="20"
      cx="200"
      cy="200"
      r="190"
      stroke-linecap="round"
    />
    <polyline
      class="tick"
      fill="none"
      stroke-width="26"
      points="120,214 173,260 274,160"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></polyline>
  </svg>
</template>

<script setup lang="ts">
import type { SuccessIconProps } from "./types";

// options
defineOptions({ name: "McSuccessIcon" });

// props
withDefaults(defineProps<SuccessIconProps>(), {
  width: "40px",
  height: "40px",
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
