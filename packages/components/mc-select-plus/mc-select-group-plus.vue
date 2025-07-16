<template>
  <ul v-show="isVisible" class="mc-select-group">
    <li class="mc-select-group-label">{{ label }}</li>
    <li>
      <ul class="mc-select-option-list">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { SelectGroupPlusProps } from "./types";

// options
defineOptions({ name: "McSelectGroup" });

// props
const props = defineProps<SelectGroupPlusProps>();

// visible
const isVisible = ref<boolean>(true);
</script>

<style scoped lang="scss">
@use "./styles/mc-select-group.scss";
</style>
