<template>
  <div
    class="mc-collapse-item"
    :class="{ 'mc-collapse-item--active': isActive }"
    @click="handleClick"
  >
    <div class="mc-collapse-item-header">
      <span class="mc-collapse-item-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="triangle-icon">
        <mc-icon name="triangle-up" />
      </span>
    </div>
    <div class="mc-collapse-item-wapper" v-show="isActive">
      <div class="mc-collapse-item-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from "./types";
import { inject, computed } from "vue";
import { COLLAPSE_CONTEXT_KEY } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";

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

<style scoped lang="scss">
@use "./styles/mc-collapse-item.scss";
</style>
