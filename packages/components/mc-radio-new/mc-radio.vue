<template>
  <div class="mc-radio">
    <label
      class="mc-radio-label"
      :class="{ 'mc-radio-checked': true, 'mc-radio-disabled': false }"
    >
      <input type="radio" class="mc-radio-input" :disabled="disabled" />
      <span class="mc-radio-circle"></span>
      <div class="mc-radio-content">
        <slot>{{ label }}</slot>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { RadioProps } from "./types";

// options
defineOptions({
  name: "McRadio",
});

// props
const props = defineProps<RadioProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-radio.scss";
</style>
