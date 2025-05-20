<template>
  <div></div>
</template>

<script setup lang="ts">
import type { SelectEmits, SelectProps } from "./types";

// options
defineOptions({
  name: "McSelect",
});

// props
withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});

// emits
const emit = defineEmits<SelectEmits>();
</script>

<style scoped></style>
