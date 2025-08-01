<template>
  <div
    ref="wrapperRef"
    class="mc-checkbox"
    :class="{
      'mc-checkbox-disabled': isDisabled,
      'mc-checkbox-focused': isFocused,
      [validateStyle]: validateStyle,
    }"
    :style="{ height: remarks ? '40px' : '24px' }"
  >
    <input
      ref="inputRef"
      :id="formId"
      type="checkbox"
      class="mc-checkbox__input"
      :value="checkboxGroupValue"
      :disabled="isDisabled"
      @keypress.prevent.stop.enter="handleClick"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <label class="mc-checkbox__wrapper">
      <span
        class="mc-checkbox__checkbox"
        @click="handleClick"
        :class="{
          'mc-checkbox__checkbox--checked': !!checkboxGroupValue,
          'mc-checkbox__checkbox--partial': partial,
        }"
      ></span>
      <div class="mc-checkbox__content">
        <span class="mc-checkbox__content-text">{{ content }}</span>
        <span class="mc-checkbox__content-remarks">{{ remarks }}</span>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import type {
  CheckboxProps,
  CheckboxEmits,
  CheckboxGroupContext,
} from "./types";
import { computed, inject, nextTick, ref } from "vue";
import { includes, isFunction } from "lodash-es";
import { useFocusController } from "@mc-plus/hooks";
import { useFormValidate } from "../mc-form/hooks";
import { CHECKBOX_GROUP_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McCheckbox" });

// props
const props = withDefaults(defineProps<CheckboxProps>(), {
  formValidate: true,
});

// emits
const emits = defineEmits<CheckboxEmits>();

// use form validate hook
const { formId, formItem, formDisabled, validateStyle } = useFormValidate();

// input ref
const inputRef = ref<HTMLInputElement>();

// use focus controller
const { wrapperRef, isFocused, handleFocus, handleBlur } =
  useFocusController(inputRef);

// checkbox group
const checkboxGroupCtx = inject<CheckboxGroupContext | undefined>(
  CHECKBOX_GROUP_INJECTION_KEY,
  void 0
);

// disable
const isDisabled = computed(
  () => formDisabled.value || checkboxGroupCtx?.disabled?.value
);

// checkbox group
const isCheckboxGroup = computed(
  () => !!checkboxGroupCtx && isFunction(checkboxGroupCtx?.handleSelect)
);

// checkbox group value
const checkboxGroupValue = computed(() => {
  if (isCheckboxGroup.value) {
    return (
      props.value && includes(checkboxGroupCtx?.modelValue?.value, props.value)
    );
  } else {
    return props.modelValue;
  }
});

// click
const handleClick = async () => {
  if (isDisabled.value) return;
  if (isCheckboxGroup.value) {
    checkboxGroupCtx?.handleSelect(props.value);
  } else {
    emits("update:modelValue", !props.modelValue);
    emits("change", !props.modelValue);
    await nextTick();
    formItem?.validate("input");
  }
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
