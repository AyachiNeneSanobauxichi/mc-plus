<template>
  <div class="mc-collapse-item">Mc Collpase item</div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from "./types";
import { inject, computed } from "vue";
import { COLLAPSE_CONTEXT_KEY } from "./constant";

// options
defineOptions({
  name: "McCollapseItem",
});

// props
const { name, disabled } = defineProps<CollapseItemProps>();
// context
const ctx = inject(COLLAPSE_CONTEXT_KEY, void 0);
// active
const isActive = computed(() => ctx?.activeNames.value?.includes(name));

// item click
const handleClick = () => {
  if (disabled) return;
  ctx?.handleItemClick(name);  
};
</script>

<style scoped lang="scss"></style>
