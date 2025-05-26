<template>
  <div
    class="mc-checkbox"
    :class="{ 'mc-checkbox--disabled': disabled }"
    :style="{ height: remarks ? '40px' : '24px' }"
  >
    <input
      type="checkbox"
      class="mc-checkbox__input"
      :value="modelValue"
      :disabled="disabled"
    />
    <label class="mc-checkbox__wrapper">
      <span
        class="mc-checkbox__checkbox"
        @click="handleClick"
        :class="{ 'mc-checkbox__checkbox--checked': modelValue }"
      ></span>
      <div class="mc-checkbox__content">
        <span class="mc-checkbox__content-text">{{ content }}</span>
        <span class="mc-checkbox__content-remarks">{{ remarks }}</span>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxProps, CheckboxEmits } from "./types";

// options
defineOptions({
  name: "McCheckbox",
});

// props
const props = defineProps<CheckboxProps>();

// emits
const emit = defineEmits<CheckboxEmits>();

// click
const handleClick = () => {
  if (props.disabled) return;
  emit("update:modelValue", !props.modelValue);
  emit("change", !props.modelValue);
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
