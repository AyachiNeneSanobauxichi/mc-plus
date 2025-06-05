<template>
  <div
    class="mc-overlay"
    ref="_ref"
    @click="(e) => handleClick(e)"
    v-if="visible"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { OverlayEmits, OverlayInstance, OverlayPorps } from "./types";

// options
defineOptions({ name: "McOverlay" });

// props
defineProps<OverlayPorps>();

// emit
const emit = defineEmits<OverlayEmits>();

// ref
const _ref = ref<HTMLDivElement>();

// click overlay
const handleClick = (e: MouseEvent) => {
  if (e.target !== _ref.value) return;
  emit("click");
};

// expose
defineExpose<OverlayInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
