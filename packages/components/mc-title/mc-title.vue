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
          <mc-title-toolbar
            :show-reset="showReset"
            :show-mandatory="showMandatory"
            @reset="emit('reset')"
          >
            <template #reset>
              <slot name="reset"></slot>
            </template>
            <template #mandatory>
              <slot name="mandatory"></slot>
            </template>
          </mc-title-toolbar>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TitleEmits, TitleInstance, TitleProps } from "./types";
import { ref } from "vue";
import McTitleToolbar from "../mc-title-toolbar/mc-title-toolbar.vue";

// options
defineOptions({ name: "McTitle" });

// props
withDefaults(defineProps<TitleProps>(), {
  width: "100%",
  height: "auto",
  showToolBar: true,
  showBorder: false,
  showReset: true,
  showMandatory: true,
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
