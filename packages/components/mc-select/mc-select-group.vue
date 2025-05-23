<template>
  <div class="mc-select-group" v-show="isShow">
    <div class="mc-select-group-label">{{ label }}</div>
    <div class="mc-select-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide } from "vue";
import { SELECT_GROUP_INJECTION_KEY, SELECT_INJECTION_KEY } from "./constant";
import type { SelectGroupProps } from "./types";

// props
const props = defineProps<SelectGroupProps>();

// context
const ctx = inject(SELECT_INJECTION_KEY, void 0);

// provide
provide(SELECT_GROUP_INJECTION_KEY, {
  groupName: props.label,
});

// show
const isShow = computed(() => {
  return ctx?.filterOptions.value.some((item) => item.group === props.label);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select-group";
</style>
