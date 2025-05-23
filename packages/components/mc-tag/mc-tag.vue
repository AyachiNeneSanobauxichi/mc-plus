<template>
  <Transition name="mc-tag-fade">
    <div
      ref="_ref"
      :class="[
        'mc-tag',
        `mc-tag--${type}`,
        `mc-tag--radius-${radius}`,
        `mc-tag--${size}`,
        {
          'is-disabled': disabled,
          'is-selected': selected,
          'is-closing': isClosing,
        },
      ]"
      v-if="visible"
      @click="handleTagClick"
      :style="computedStyle">
      <mc-icon v-if="icon" :name="icon" />
      <slot></slot>
      <Transition name="mc-tag-close">
        <mc-icon v-if="closable" :name="'Cross'" class="mc-tag__close" @click.stop="handleTagClose" />
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import type { TagEmits, TagInstance, TagProps } from "./types";

defineOptions({
  name: "McTag",
});

const props = withDefaults(defineProps<TagProps>(), {
  type: "primary",
  size: "medium",
  selected: false,
  radius: "default",
});

const emit = defineEmits<TagEmits>();

const { disabled, height, width, color, radius: propRadius, icon, closable, selected } = toRefs(props);

const _ref = ref<HTMLDivElement>();
const visible = ref(true);
const isClosing = ref(false);

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

const computedStyle = computed(() => {
  const style: Record<string, string> = {};

  if (width?.value) {
    style.width = width.value;
  }

  if (height?.value) {
    style.height = height.value;
  }

  if (color?.value) {
    style["--tag-color"] = color.value;
    style["--tag-hover-color"] = getColorShade(color.value, 0.7);

    // 自动设置文本颜色
    const isDarkColor = isColorDark(color.value);
    style["--tag-text-color"] = isDarkColor ? "white" : "var(--mc-black)";
  }

  return style;
});

// 判断颜色是否为深色
const isColorDark = (color: string) => {
  if (!color || color === "transparent") return false;

  // 处理CSS变量
  if (color.startsWith("var(--")) {
    return false; // 默认假设变量是浅色，实际使用时可能需要更复杂的处理
  }

  // 处理十六进制颜色
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r * 0.299 + g * 0.587 + b * 0.114 > 186;
  }

  // 处理RGB/RGBA颜色
  if (color.startsWith("rgb") || color.startsWith("rgba")) {
    const rgb = color.match(/\d+/g)?.map(Number) || [255, 255, 255];
    return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186;
  }

  return false;
};

const handleTagClick = (e: MouseEvent) => {
  if (disabled.value) return;
  emit("click", e);
};

const handleTagClose = async (e: MouseEvent) => {
  if (disabled.value) return;

  isClosing.value = true;
  await new Promise((resolve) => setTimeout(resolve, 200)); // 等待关闭动画完成
  visible.value = false;
  emit("close", e);

  // 重置状态，以便下次显示时能正常显示动画
  setTimeout(() => {
    isClosing.value = false;
  }, 500);
};

defineExpose<TagInstance>({
  ref: _ref,
});
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
