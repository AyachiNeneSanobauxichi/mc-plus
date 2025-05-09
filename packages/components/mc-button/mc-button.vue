<template>
  <button
    ref="_ref"
    class="mc-button"
    :type="nativeType"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`mc-button--${type}`]: type,
      [`mc-button--${size}`]: size,
      'is-loading': loading,
      'is-disabled': disabled,
    }"
    @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)"
  >
    <template v-if="leftIcon && !loading">
      <mc-icon :name="leftIcon" />
    </template>
    <template v-if="loading">
      <span class="loading-icon">
        <mc-icon name="loading-dot" />
      </span>
    </template>
    <slot></slot>
    <template v-if="rightIcon">
      <mc-icon :name="rightIcon" />
    </template>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { ref, toRefs } from "vue";
import { throttle } from "lodash-es";
import { McIcon } from "mc-plus";

// options
defineOptions({
  name: "McButton",
});

// props
const props = withDefaults(defineProps<ButtonProps>(), {
  type: "primary",
  nativeType: "button",
  size: "medium",
  useThrottle: true,
  throttleDuration: 500,
});
const { loading, disabled, throttleDuration } = toRefs(props);

// emits
const emit = defineEmits<ButtonEmits>();

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
