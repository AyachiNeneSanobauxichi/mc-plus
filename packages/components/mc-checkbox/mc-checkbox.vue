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
      :value="modelValue"
      :disabled="isDisabled"
    />
    <label class="mc-checkbox__wrapper">
      <span
        class="mc-checkbox__checkbox"
        @click="handleClick"
        :class="{
          'mc-checkbox__checkbox--checked': modelValue,
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
import { computed, watch } from "vue";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";
import type { CheckboxProps, CheckboxEmits } from "./types";

// options
defineOptions({ name: "McCheckbox" });

// props
const props = defineProps<CheckboxProps>();

// emits
const emits = defineEmits<CheckboxEmits>();

// form item
const { formItem } = useFormItem();

// form item disable
const disabled = useFormDisabled();

// disable
const isDisabled = computed(() => disabled.value);

// error
const isError = computed(
  () => !isDisabled.value && formItem?.validateStatus === "error"
);

// click
const handleClick = () => {
  if (props.disabled) return;
  emits("update:modelValue", !props.modelValue);
  emits("change", !props.modelValue);
};

// model value changed
watch(
  () => props.modelValue,
  () => {
    formItem?.validate("change");
  }
);
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
