<!--
 * @Author: Tieju yang
 * @Date: 2025-05-20 13:57:15
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-20 15:07:54
-->
<template>
  <div
    ref="_ref"
    :style="style"
    class="mc-alert"
    :class="{
      [`mc-alert--${type}`]: type,
      [`mc-alert--${size}`]: size,
    }"
    v-if="visible">
    <div class="mc-alert__content">
      <mc-icon v-if="showIcon" :name="iconMap[type]" class="mc-alert__icon"></mc-icon>
      <div class="mc-alert__message" v-if="description">
        <div class="mc-alert__title">{{ title }}</div>
        <div class="mc-alert__description">{{ description }}</div>
      </div>
      <slot v-else></slot>
    </div>
    <mc-icon v-if="closable" name="Cross" class="mc-alert__close" @click="handleClose"></mc-icon>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, toValue, useAttrs } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import type { IconType } from "../mc-icon/types";
import type { AlertEmits, AlertInstance, AlertProps } from "./types";

// options
defineOptions({
  name: "McAlert",
});

// props
const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  size: "medium",
  closable: true,
  showIcon: true,
});

const { height, width } = toRefs(props);

// emits
const emit = defineEmits<AlertEmits>();

// ref
const _ref = ref<HTMLDivElement>();
const visible = ref(true);

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

// icon mapping
const iconMap: Record<string, IconType> = {
  success: "Accept_02",
  info: "Info_02",
  warning: "Error_02",
  error: "Error_04",
};

// close event
const handleClose = (e: MouseEvent) => {
  visible.value = false;
  emit("close", e);
};

// expose
defineExpose<AlertInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
