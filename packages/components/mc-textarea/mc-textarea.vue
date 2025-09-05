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
      :style="{ width, height, resize }"
      :disabled="isDisabled"
      :maxlength="maxLength"
      :placeholder="placeholder"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    ></textarea>
    <template v-if="showCount">
      <slot
        name="count"
        :max-length="maxLength"
        :current-length="currentLength"
      >
        <div class="mc-textarea-count">
          <span>
            {{ `${currentLength} / ${maxLength} characters` }}
          </span>
        </div>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { McTextareaEmits, McTextareaProps } from "./types";
import { computed, nextTick, ref, useSlots } from "vue";
import { useFocus, useWidthHeight } from "@mc-plus/hooks";
import { useFormValidate } from "../mc-form/hooks";
import { MC_TEXTAREA } from "./constanst";

// options
defineOptions({ name: MC_TEXTAREA });

// props
const props = withDefaults(defineProps<McTextareaProps>(), {
  modelValue: "",
  placeholder: "Please input",
  disabled: false,
  showCount: true,
  width: "100%",
  height: 88,
  resize: "vertical",
  maxLength: 255,
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
} = useFocus(textareaRef);

// use form validate hook
const {
  formId,
  formItem,
  validateStyle,
  formDisabled: isDisabled,
} = useFormValidate();

// handle input
const handleInput = async (e: Event) => {
  let value = (e.target as HTMLTextAreaElement).value;
  if (props.maxLength > 0 && value.length > props.maxLength) {
    value = value.slice(0, props.maxLength);
  }
  emit("update:modelValue", value);
  emit("change", value);
  await nextTick();
  formItem?.validate("input");
};

// slots
const slots = useSlots();

// show count
const showCount = computed<boolean>(() => {
  return (!!props.showCount && props.maxLength > 0) || !!slots.count;
});

// current length
const currentLength = computed<number>(() => {
  return props.modelValue?.length ?? 0;
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
