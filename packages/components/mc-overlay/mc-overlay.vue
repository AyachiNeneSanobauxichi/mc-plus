<template>
  <div class="mc-overlay" @click="handleClick" v-if="visible">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { OverlayEmits, OverlayPorps } from "./types";

// options
defineOptions({ name: "McOverlay" });

// props
defineProps<OverlayPorps>();

// emit
const emit = defineEmits<OverlayEmits>();

// click overlay
const handleClick = () => {
  emit("click");
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
