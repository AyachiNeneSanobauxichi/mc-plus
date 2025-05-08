<template>
  <component
    :is="tag"
    ref="_ref"
    class="mc-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`mc-button--${type}`]: type,
      [`mc-button--${size}`]: size,
      'is-loading': loading,
      'is-disabled': disabled,
    }"
    @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { ref, toRefs } from "vue";
import { throttle } from "lodash-es";

// options
defineOptions({
  name: "McButton",
});

// props
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  type: "primary",
  nativeType: "button",
  size: "medium",
  useThrottle: true,
  throttleDuration: 500,
});
const { loading, disabled, throttleDuration } = toRefs(props);

// emits
const emit = defineEmits<ButtonEmits>();

// slots
const slots = defineSlots();

// ref
const _ref = ref<HTMLButtonElement>();

// click event
const handleBtnClick = (e: MouseEvent) => {
  if (loading.value || disabled.value) return;
  emit("click", e);
};
// click event throttle
const handleBtnClickThrottle = throttle(handleBtnClick, throttleDuration.value);

// expose
defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
