<template>
  <div ref="_ref" v-if="visible" class="mc-tag" :class="['mc-tag--' + type, 'mc-tag--' + size, 'mc-tag-radius--' + radius, { 'is-disabled': disabled, 'is-selected': selected }]" :style="computedStyle" @click="handleTagClick">
    <mc-icon class="mc-tag__icon" v-if="icon" :name="icon" :size="sizeMap[size]" />
    <slot></slot>
    <mc-icon v-if="closable && !disabled" name="Cross" class="mc-tag__close-icon" :size="sizeMap[size]" @click="handleTagClose" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import mcIcon from "../mc-icon/mc-icon.vue";
import type { TagEmits, TagInstance, TagProps } from "./types";

// options
defineOptions({name: 'McTag'})

const _ref = ref<HTMLDivElement>();

const props = withDefaults(defineProps<TagProps>(), {
  type: "primary",
  size: "medium",
  radius: "default",
  disabled: false,
  closable: false,
});

const emit = defineEmits<TagEmits>();

const visible = ref(true);

const { type, size, disabled, closable, color, textColor, backgroundColor, selectedTextColor, selectedBackgroundColor, radius, height, width, icon, selected } = toRefs(props);

const sizeMap = {
  small: 16,
  medium: 16,
  large: 24,
} as const;

const computedStyle = computed(() => {
  const style: Record<string, string> = {};

  if (width?.value) {
    style.width = width.value;
  }

  if (height?.value) {
    style.height = height.value;
  }

  if (color?.value) {
    // 默认字体颜色
    style["--tag-color"] = color.value;
    // 默认选中背景颜色
    style["--tag-hover-color"] = getColorShade(color.value, 0.7);
    // 默认字体颜色
    style["--tag-text-color"] = "#ffffff";
    // 默认选中字体颜色
    style["--tag-hover-text-color"] = "#ffffff";
  } else {
    // 传入的字体颜色
    if (textColor?.value) {
      style["--tag-text-color"] = textColor.value;
    }

    // 传入的背景颜色
    if (backgroundColor?.value) {
      style["--tag-color"] = backgroundColor.value;
    }

    // 传入的选中字体颜色
    if (selectedTextColor?.value) {
      style["--tag-hover-text-color"] = selectedTextColor.value;
    }

    // 传入的选中背景颜色
    if (selectedBackgroundColor?.value) {
      style["--tag-hover-color"] = selectedBackgroundColor.value;
    }
  }

  return style;
});

const handleTagClick = (e: MouseEvent) => {
  if (disabled.value) return;
  emit("click", e);
};

const handleTagClose = (e: MouseEvent) => {
  if (disabled.value) return;
  visible.value = false;
  emit("close", e);
};

// 改进的颜色处理函数
const getColorShade = (baseColor: string, shadeFactor: number = 0.7) => {
  if (!baseColor || baseColor === "transparent") return baseColor;

  // 处理CSS变量
  if (baseColor.startsWith("var(--")) {
    return baseColor;
  }

  // 处理十六进制颜色
  if (baseColor.startsWith("#")) {
    const hex = baseColor.slice(1);
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const darkerR = Math.max(0, Math.floor(r * shadeFactor));
    const darkerG = Math.max(0, Math.floor(g * shadeFactor));
    const darkerB = Math.max(0, Math.floor(b * shadeFactor));

    return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
  }

  // 处理命名颜色和RGB/RGBA格式
  const colorElement = document.createElement("div");
  colorElement.style.color = baseColor;
  document.body.appendChild(colorElement);
  const computedColor = getComputedStyle(colorElement).color;
  document.body.removeChild(colorElement);

  if (computedColor.startsWith("rgb") || computedColor.startsWith("rgba")) {
    const rgb = computedColor.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const darkerR = Math.max(0, Math.floor(rgb[0] * shadeFactor));
    const darkerG = Math.max(0, Math.floor(rgb[1] * shadeFactor));
    const darkerB = Math.max(0, Math.floor(rgb[2] * shadeFactor));

    if (computedColor.includes("a")) {
      const alpha = parseFloat(computedColor.split(",")[3].trim().replace(")", ""));
      return `rgba(${darkerR}, ${darkerG}, ${darkerB}, ${alpha})`;
    }
    return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
  }

  return baseColor;
};

defineExpose<TagInstance>({
  ref: _ref,
});
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
