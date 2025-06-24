<template>
  <div class="mc-status" :class="[`mc-status-${type}`]">
    <div class="mc-status-icon">
      <mc-icon name="Indicator" :size="12" />
    </div>
    <p class="mc-status-content">
      <slot> </slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { StatusProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "McStatus" });

// props
withDefaults(defineProps<StatusProps>(), {
  type: "info",
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
