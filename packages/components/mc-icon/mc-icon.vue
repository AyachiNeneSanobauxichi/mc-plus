<template>
  <i
    ref="_ref"
    class="mc-iconfont"
    :class="`icon-${name}`"
    @click="(e: MouseEvent) => handleIconClick(e)"
    >ICON</i
  >
</template>

<script setup lang="ts">
import type { IconEmits, IconInstance, IconProps } from "./types";
import { ref } from "vue";

// options
defineOptions({
  name: "McIcon",
});

// props
defineProps<IconProps>();

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
