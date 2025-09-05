<template>
  <div
    class="mc-divider"
    :class="[
      `mc-divider-${orientation}`,
      `mc-divider-${size}`,
      `mc-divider-${emphasis}`,
    ]"
  ></div>
</template>

<script setup lang="ts">
import type { DividerProps } from "./types";

// options
defineOptions({ name: "McDivider" });

// props
withDefaults(defineProps<DividerProps>(), {
  size: "small",
  emphasis: "minimal",
  orientation: "horizontal",
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
