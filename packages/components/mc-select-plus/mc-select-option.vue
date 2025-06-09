<template>
  <li
    class="mc-select-option"
    :class="{ 'mc-select-selected': isSelected }"
    :style="{ height, width }"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import type { SelecOptinonProps } from "./types";
import { ref } from "vue";

// options
defineOptions({ name: "McSelectOption" });

// props
withDefaults(defineProps<SelecOptinonProps>(), {
  width: "100%",
  height: "40px",
});

// select
const isSelected = ref<boolean>(false);
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
