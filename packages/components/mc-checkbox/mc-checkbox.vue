<template>
  <div class="mc-checkbox">
    <label
      ref="checkboxRef"
      class="mc-checkbox-wrapper"
      :class="{
        'mc-checkbox-disabled': isDisabled,
        'mc-checkbox-checked': isChecked,
        'mc-checkbox-partial': partial,
        'mc-checkbox-focused': isFocused,
        [validateStyle]: validateStyle,
      }"
      @click.prevent="handleClick"
    >
      <input
        ref="checkboxInputRef"
        :id="formId"
        type="checkbox"
        class="mc-checkbox-input"
        :value="isChecked"
        :disabled="isDisabled"
        @keypress.prevent.stop.enter="handleClick"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div class="mc-checkbox-box"></div>
      <div class="mc-checkbox-content" v-if="content || $slots.default">
        <slot>{{ content }}</slot>
      </div>
    </label>
    <div class="mc-checkbox-remarks" v-if="remarks || $slots.remarks">
      <slot name="remarks">{{ remarks }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxProps, CheckboxEmits } from "./types";
import { computed, nextTick, ref } from "vue";
import { useFocusController } from "@mc-plus/hooks";
import { useFormValidate } from "../mc-form/hooks";
import { MC_CHECKBOX } from "./constant";
import { useCheckboxGroup } from "./hooks";

// options
defineOptions({ name: MC_CHECKBOX });

// props
const props = withDefaults(defineProps<CheckboxProps>(), {
  disableValidation: false,
});

// emits
const emits = defineEmits<CheckboxEmits>();

// checkbox input ref
const checkboxInputRef = ref<HTMLInputElement>();

// use focus controller
const {
  wrapperRef: checkboxRef,
  isFocused,
  handleFocus,
  handleBlur,
} = useFocusController(checkboxInputRef);

// use checkbox group hook
const {
  checkboxGroupDisabled,
  isCheckboxGroup,
  isCheckboxSelected,
  handleCheckboxSelect,
} = useCheckboxGroup();

// use form validate hook
const {
  formId,
  formItem,
  formDisabled: isDisabled,
  validateStyle,
} = useFormValidate({
  externalDisabled: checkboxGroupDisabled,
});

// is checked
const isChecked = computed<boolean>(() => {
  return isCheckboxGroup.value
    ? isCheckboxSelected(props.value)
    : !!props.modelValue;
});

// click
const handleClick = async () => {
  if (isDisabled.value) return;
  if (isCheckboxGroup.value) {
    handleCheckboxSelect(props.value);
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
