<template>
  <li
    class="mc-select-dropdown-item mc-select-option"
    :class="{ 'mc-select-option-icon-active': isActive }"
    @click="handleClick"
  >
    <div class="mc-select-option-content">
      <slot>{{ label }}</slot>
    </div>
    <div class="mc-select-option-icon">
      <mc-icon name="Tick" v-if="isActive" />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { SelectOptionProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { computed, inject } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";

// options
defineOptions({
  name: "McSelectOption",
});

// props
const props = defineProps<SelectOptionProps>();

// context
const ctx = inject(SELECT_INJECTION_KEY, void 0);

// active
const isActive = computed(() => {
  return ctx?.selectValues.value.includes(props.value);
});

// click
const handleClick = () => {
  ctx?.handleSelect(props);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
