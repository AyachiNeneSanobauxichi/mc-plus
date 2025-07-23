<template>
  <div class="mc-count">Mc Count</div>
</template>

<script setup lang="ts">
import type { CountEmits, CountProps } from "./types";

// options
defineOptions({ name: "McCount" });

// props
const props = withDefaults(defineProps<CountProps>(), {
  theme: "red",
  type: "medium",
  hiddenZero: true,
});

// emits
const emit = defineEmits<CountEmits>();
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
