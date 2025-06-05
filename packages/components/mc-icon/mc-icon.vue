<template>
  <span
    class="mc-icon"
    :style="{
      fontSize: `${size}px`,
      width: `${size}px`,
      height: `${size}px`,
      color: color,
    }"
  >
    <i
      ref="_ref"
      class="mc-iconfont"
      :class="`mc-icon--${name}`"
      @click="(e: MouseEvent) => handleIconClick(e)"
    ></i>
  </span>
</template>

<script setup lang="ts">
import type { IconEmits, IconInstance, IconProps } from "./types";
import { ref } from "vue";

// options
defineOptions({ name: "McIcon" });

// props
withDefaults(defineProps<IconProps>(), {
  size: 16,
});

// emits
const emit = defineEmits<IconEmits>();

// ref
const _ref = ref<HTMLElement>();

// click event
const handleIconClick = (e: MouseEvent) => {
  emit("click", e);
};

// expose
defineExpose<IconInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
