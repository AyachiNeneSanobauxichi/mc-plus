<template>
  <div class="mc-checkbox">
    <label
      ref="checkboxRef"
      class="mc-checkbox-wrapper"
      :class="{
        'mc-checkbox-disabled': isDisabled,
        'mc-checkbox-checked': checkboxGroupValue,
        'mc-checkbox-partial': partial,
        'mc-checkbox-focused': isFocused,
        [validateStyle]: validateStyle,
      }"
      @click.prevent.stop="handleClick"
    >
      <input
        ref="checkboxInputRef"
        :id="formId"
        type="checkbox"
        class="mc-checkbox-input"
        :value="checkboxGroupValue"
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
import type {
  CheckboxProps,
  CheckboxEmits,
  CheckboxGroupContext,
} from "./types";
import { computed, inject, nextTick, ref } from "vue";
import { includes, isFunction } from "lodash-es";
import { useFocusController } from "@mc-plus/hooks";
import { useFormValidate } from "../mc-form/hooks";
import { CHECKBOX_GROUP_INJECTION_KEY, MC_CHECKBOX } from "./constant";

// options
defineOptions({ name: MC_CHECKBOX });

// props
const props = withDefaults(defineProps<CheckboxProps>(), {
  formValidate: true,
});

// emits
const emits = defineEmits<CheckboxEmits>();

// use form validate hook
const { formId, formItem, formDisabled, validateStyle } = useFormValidate();

// checkbox input ref
const checkboxInputRef = ref<HTMLInputElement>();

// use focus controller
const {
  wrapperRef: checkboxRef,
  isFocused,
  handleFocus,
  handleBlur,
} = useFocusController(checkboxInputRef);

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
const checkboxGroupValue = computed<boolean>(() => {
  if (isCheckboxGroup.value) {
    return (
      !!props.value &&
      includes(checkboxGroupCtx?.modelValue?.value, props.value)
    );
  } else {
    return !!props.modelValue;
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
