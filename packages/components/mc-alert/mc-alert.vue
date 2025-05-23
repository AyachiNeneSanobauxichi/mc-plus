<!--
 * @Author: Tieju yang
 * @Date: 2025-05-20 13:57:15
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 11:59:01
-->
<template>
  <div ref="_ref" :style="style" class="mc-alert" :class="[`mc-alert--${type}`, `mc-alert--${size}`]" v-if="visible">
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
import { computed, ref, useAttrs } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import type { IconType } from "../mc-icon/types";
import type { AlertEmits, AlertInstance, AlertProps } from "./types";

defineOptions({
  name: "McAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  size: "medium",
  closable: true,
  showIcon: true,
});

const emit = defineEmits<AlertEmits>();

const _ref = ref<HTMLDivElement>();
const visible = ref(true);
const attrs = useAttrs();

const style = computed(() => {
  const attrStyle = attrs.style as Record<string, string> | undefined;
  return {
    ...(attrStyle || {}),
    width: props.width,
    height: props.height,
  };
});

const iconMap: Record<string, IconType> = {
  success: "Accept_02",
  info: "Info_02",
  warning: "Error_02",
  error: "Error_04",
};

const handleClose = (e: MouseEvent) => {
  visible.value = false;
  emit("close", e);
};

defineExpose<AlertInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
