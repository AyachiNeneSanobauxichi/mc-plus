<template>
  <div class="mc-secondary-menu">
    <div class="mc-secondary-menu-wrapper"></div>
    <div
      class="mc-secondary-menu-item"
      v-for="option in options"
      :key="option.name"
    >
      <div class="mc-secondary-menu-item-label">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SecondaryMenuEmits, SecondaryMenuProps } from "./types";

// options
defineOptions({ name: "McSecondaryMenu" });

// props
const props = withDefaults(defineProps<SecondaryMenuProps>(), {
  options: () => [],
});

// emits
const emits = defineEmits<SecondaryMenuEmits>();
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
