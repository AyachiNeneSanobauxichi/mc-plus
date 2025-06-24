<template>
  <div class="mc-secondary-menu">Secondary Menu</div>
</template>

<script setup lang="ts">
import type { SecondaryMenuEmits, SecondaryMenuProps } from "./types";

// options
defineOptions({ name: "McSecondaryMenu" });

// props
const props = withDefaults(defineProps<SecondaryMenuProps>(), {});

// emits
const emits = defineEmits<SecondaryMenuEmits>();
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
