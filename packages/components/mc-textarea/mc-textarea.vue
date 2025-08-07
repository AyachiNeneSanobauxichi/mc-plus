<template>
  <div
    ref="textareaWrapperRef"
    class="mc-textarea"
    :class="{
      'mc-textarea-disabled': disabled,
      'mc-textarea-focused': isFocused,
    }"
    :style="{ width }"
  >
    <textarea
      ref="textareaRef"
      class="mc-textarea-input"
      :placeholder="placeholder"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      :style="{ width, height, resize }"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import type { McTextareaEmits, McTextareaProps } from "./types";
import { ref } from "vue";
import { useFocusController, useWidthHeight } from "@mc-plus/hooks";
import { MC_TEXTAREA } from "./constanst";

// options
defineOptions({ name: MC_TEXTAREA });

// props
withDefaults(defineProps<McTextareaProps>(), {
  modelValue: "",
  placeholder: "Please input",
  disabled: false,
  showCount: true,
  width: "100%",
  height: 88,
  resize: "vertical",
});

// emits
const emit = defineEmits<McTextareaEmits>();

// use width and height hook
const { width, height } = useWidthHeight();

// textarea ref
const textareaRef = ref<HTMLTextAreaElement>();

// use focus hook
const {
  wrapperRef: textareaWrapperRef,
  isFocused,
  handleFocus,
  handleBlur,
} = useFocusController(textareaRef);
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
