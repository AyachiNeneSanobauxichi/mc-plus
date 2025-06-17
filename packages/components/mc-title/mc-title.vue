<template>
  <div
    class="mc-title"
    :class="{ 'mc-title-border': showBorder }"
    ref="_ref"
    :style="{ width: width, height: height }"
  >
    <div class="mc-title-content">
      <slot>
        <h1 class="mc-title-text">
          {{ title }}
        </h1>
      </slot>
    </div>
    <div class="mc-title-tool-bar">
      <slot name="tool-bar">
        <template v-if="showToolBar">
          <mc-title-tool-bar @reset="emit('reset')" />
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TitleEmits, TitleInstance, TitleProps } from "./types";
import McTitleToolBar from "./mc-title-tool-bar.vue";
import { ref } from "vue";

// options
defineOptions({ name: "McTitle" });

// props
withDefaults(defineProps<TitleProps>(), {
  width: "100%",
  height: "auto",
  showToolBar: true,
  showBorder: false,
});

// emit
const emit = defineEmits<TitleEmits>();

// ref
const _ref = ref<HTMLDivElement>();

// expose
defineExpose<TitleInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-title.scss";
</style>
