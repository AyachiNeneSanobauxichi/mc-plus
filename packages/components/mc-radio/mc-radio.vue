<template>
  <div class="mc-radio">
    <label
      class="mc-radio-label"
      :class="{
        'mc-radio-checked': isSelected,
        'mc-radio-disabled': isDisabled,
      }"
      @click="handleSelect"
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
import type { RadioGroupContext, RadioProps } from "./types";
import { RADIO_INJECTION_KEY } from "./constant";
import { computed, inject } from "vue";

// options
defineOptions({
  name: "McRadio",
});

// props
const props = defineProps<RadioProps>();

// inject
const radioContext = inject<RadioGroupContext>(RADIO_INJECTION_KEY);

// selected
const isSelected = computed(() => {
  return radioContext?.modelValue?.value === props.value;
});

// disabled
const isDisabled = computed(() => {
  return radioContext?.disabled?.value || props.disabled;
});

// select event
const handleSelect = () => {
  if (isDisabled.value) return;
  radioContext?.handleSelect(props.value);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-radio.scss";
</style>
