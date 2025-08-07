<template>
  <div
    ref="textareaWrapperRef"
    class="mc-textarea"
    :class="{
      'mc-textarea-disabled': isDisabled,
      'mc-textarea-focused': isFocused,
      [validateStyle]: validateStyle,
    }"
    :style="{ width }"
  >
    <textarea
      ref="textareaRef"
      :value="modelValue"
      :id="formId"
      class="mc-textarea-input"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      :style="{ width, height, resize }"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import type { McTextareaEmits, McTextareaProps } from "./types";
import { nextTick, ref } from "vue";
import { useFocusController, useWidthHeight } from "@mc-plus/hooks";
import { useFormValidate } from "../mc-form/hooks";
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

// use form validate hook
const {
  formId,
  formItem,
  validateStyle,
  formDisabled: isDisabled,
} = useFormValidate();

// handle input
const handleInput = async (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  emit("change", target.value);
  await nextTick();
  formItem?.validate("input");
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
