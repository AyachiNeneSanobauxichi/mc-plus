<template>
  <button
    ref="_ref"
    :style="style"
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
      <i class="mc-iconfont" :class="`mc-icon--${leftIcon}`"></i>
    </template>
    <template v-if="loading">
      <span class="loading-icon">
        <i class="mc-iconfont" :class="`mc-icon--loading-dot`"></i>
      </span>
    </template>
    <slot></slot>
    <template v-if="rightIcon">
      <i class="mc-iconfont" :class="`mc-icon--${rightIcon}`"></i>
    </template>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { computed, ref, toRefs, toValue, useAttrs } from "vue";
import { throttle } from "lodash-es";

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
const { loading, disabled, throttleDuration, height, width } = toRefs(props);

// emits
const emit = defineEmits<ButtonEmits>();

// ref
const _ref = ref<HTMLButtonElement>();

// attrs
const attrs = toRefs(useAttrs());
// style
const style = computed(() => {
  return {
    ...toValue(attrs).style,
    ...{
      width: width.value ? width.value : void 0,
      height: height.value ? height.value : void 0,
    },
  };
});

// click event
const handleBtnClick = (e: MouseEvent) => {
  if (loading.value || disabled.value) return;
  emit("click", e);
};
// click event throttle
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  throttleDuration.value,
  { trailing: false }
);

// expose
defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
