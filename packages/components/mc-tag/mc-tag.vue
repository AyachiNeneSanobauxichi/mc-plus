<template>
  <div
    v-if="visible"
    ref="_ref"
    :style="style"
    class="mc-tag"
    :class="{
      [`mc-tag--${type}`]: type,
      [`mc-tag--${size}`]: size,
      'is-disabled': disabled,
      'is-selected': selected,
    }"
    @click="handleTagClick">
    <template v-if="icon">
      <mc-icon :name="icon"></mc-icon>
    </template>
    <slot></slot>
    <mc-icon name="Cross" v-if="closable" class="close-icon" @click.stop="handleCloseClick"></mc-icon>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, toValue, useAttrs } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import type { TagEmits, TagInstance, TagProps } from "./types";

// options
defineOptions({
  name: "McTag",
});

// props
const props = withDefaults(defineProps<TagProps>(), {
  type: "primary",
  size: "medium",
  selected: false,
});
const { disabled, height, width } = toRefs(props);

// emits
const emit = defineEmits<TagEmits>();

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

// click event
const handleTagClick = (e: MouseEvent) => {
  if (disabled.value) return;
  emit("click", e);
};

// close event
const handleCloseClick = (e: MouseEvent) => {
  if (disabled.value) return;
  visible.value = false;
  emit("close", e);
};

// expose
defineExpose<TagInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
