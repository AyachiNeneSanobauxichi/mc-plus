<template>
  <div
    class="mc-loading"
    :class="[`mc-loading-${size}`, { 'mc-loading-active': loading }]"
  >
    <div class="mc-loading-pulse" v-if="type === 'pulse'">
      <i class="mc-loading-pulse-dot"></i>
      <i class="mc-loading-pulse-dot"></i>
      <i class="mc-loading-pulse-dot"></i>
      <i class="mc-loading-pulse-dot"></i>
    </div>
    <div class="mc-loading-spin" v-else-if="type === 'spin'">
      <mc-icon name="Loading_Line" :size="spinSize"></mc-icon>
    </div>
    <slot v-if="loadingText || $slots.default">
      <p class="mc-loading-text">{{ loadingText }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { McLoadingProps } from "./types";
import { computed } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import { MC_LOADING } from "./constant";

// options
defineOptions({ name: MC_LOADING });

// props
const props = withDefaults(defineProps<McLoadingProps>(), {
  size: "medium",
  type: "spin",
});

// spin size
const spinSize = computed(() => {
  return props.size === "small" ? 24 : props.size === "medium" ? 32 : 64;
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
