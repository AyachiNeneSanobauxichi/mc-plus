<template>
  <div
    class="mc-tag"
    ref="_ref"
    :style="{ width, height }"
    :class="[
      `mc-tag-${size}`,
      `mc-tag-${type}`,
      `mc-tag-${emphasis}`,
      { 'mc-tag-disabled': disabled },
    ]"
  >
    <mc-icon
      v-if="leftIcon"
      :name="leftIcon"
      class="mc-tag-left-icon"
      :size="16"
    ></mc-icon>
    <slot></slot>
    <mc-icon
      v-if="rightIcon"
      :name="rightIcon"
      class="mc-tag-right-icon"
      :size="16"
    ></mc-icon>
  </div>
</template>

<script setup lang="ts">
import type { TagEmits, TagInstance, TagProps } from "./types";
import { ref } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "McTag" });

// props
const props = withDefaults(defineProps<TagProps>(), {
  size: "small",
  type: "basic",
  emphasis: "bold",
  disabled: false,
  deletable: true,
});

// emits
const emits = defineEmits<TagEmits>();

// ref
const _ref = ref<HTMLDivElement | void>();

// expose
defineExpose<TagInstance>({ ref: _ref });
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
