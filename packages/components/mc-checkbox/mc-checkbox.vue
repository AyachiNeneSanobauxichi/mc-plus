<template>
  <div
    class="mc-checkbox"
    :class="{
      'mc-checkbox--disabled': isDisabled,
      'mc-checkbox--error': isError,
    }"
    :style="{ height: remarks ? '40px' : '24px' }"
  >
    <input
      type="checkbox"
      class="mc-checkbox__input"
      :value="checkboxGroupValue"
      :disabled="isDisabled"
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
import { computed, inject, watch } from "vue";
import { includes } from "lodash-es";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";
import { CHECKBOX_GROUP_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McCheckbox" });

// props
const props = withDefaults(defineProps<CheckboxProps>(), {
  formValidate: true,
});

// emits
const emits = defineEmits<CheckboxEmits>();

// form item
const { formItem } = useFormItem();

// form item disable
const disabled = useFormDisabled();

// checkbox group
const checkboxGroupCtx = inject<CheckboxGroupContext>(
  CHECKBOX_GROUP_INJECTION_KEY
);

// disable
const isDisabled = computed(
  () => disabled.value || checkboxGroupCtx?.disabled?.value
);

// error
const isError = computed(
  () =>
    !isDisabled.value &&
    formItem?.validateStatus === "error" &&
    props.formValidate
);

// checkbox group
const isCheckboxGroup = computed(
  () =>
    !!checkboxGroupCtx && typeof checkboxGroupCtx?.handleSelect === "function"
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
const handleClick = () => {
  if (props.disabled) return;
  if (isCheckboxGroup.value) {
    checkboxGroupCtx?.handleSelect(props.value);
  } else {
    emits("update:modelValue", !props.modelValue);
    emits("change", !props.modelValue);
  }
};

// model value changed
watch(
  () => checkboxGroupValue.value,
  () => {
    if (props.formValidate) {
      formItem?.validate("change");
    }
  }
);
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
