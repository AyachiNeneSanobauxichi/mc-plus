<template>
  <component
    :is="props.tag"
    ref="_ref"
    class="mc-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`mc-button--${type}`]: type,
      [`mc-button--${size}`]: size,
      'is-plain': plain,
      'is-circle': circle,
      'is-round': round,
      'is-loading': loading,
      'is-disabled': disabled,
    }"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";

// options
defineOptions({
  name: "McButton",
});

// props
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
});

// slots
const slots = defineSlots();

// ref
const _ref = ref<HTMLButtonElement>();
</script>

<style scoped></style>
