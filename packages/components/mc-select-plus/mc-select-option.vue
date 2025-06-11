<template>
  <li
    class="mc-select-option"
    :class="{ 'mc-select-selected': isSelected }"
    :style="{ height, width }"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import type { SelectOptionProps } from "./types";
import { inject, ref } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McSelectOption" });

// props
const props = withDefaults(defineProps<SelectOptionProps>(), {
  width: "100%",
  height: "40px",
});

// context
const ctx = inject(SELECT_INJECTION_KEY, void 0);

// select
const isSelected = ref<boolean>(false);

// click option
const handleClick = () => {
  ctx?.handleSelect({ ...props });
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
