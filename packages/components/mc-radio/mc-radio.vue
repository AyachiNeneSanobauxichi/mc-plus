<template>
  <div
    ref="wrapperRef"
    class="mc-radio"
    :class="{ 'mc-radio-has-remark': !!remark }"
  >
    <label
      class="mc-radio-label"
      :class="{
        'mc-radio-checked': isSelected,
        'mc-radio-disabled': isDisabled,
        'mc-radio-focused': isFocused,
        [validateStyle]: validateStyle,
      }"
      @click="handleSelect"
    >
      <input
        ref="inputRef"
        type="radio"
        class="mc-radio-input"
        :disabled="isDisabled"
        @focus="handleFocus"
        @blur="handleBlur"
        @keypress.prevent.stop.enter="handleSelect"
      />
      <div class="mc-radio-wrapper">
        <span class="mc-radio-circle"></span>
        <div class="mc-radio-content">
          <slot>{{ label }}</slot>
        </div>
        <div class="mc-radio-help" v-if="help || $slots.help">
          <slot name="help">
            <mc-tooltip :content="help" :icon-size="24" />
          </slot>
        </div>
      </div>
    </label>
    <div class="mc-radio-remark">
      <slot name="remark">{{ remark }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RadioEmits, RadioGroupContext, RadioProps } from "./types";
import { computed, inject, nextTick, ref } from "vue";
import { useFocusController } from "@mc-plus/hooks";
import McTooltip from "../mc-tooltip/mc-tooltip.vue";
import { useFormValidate } from "../mc-form/hooks";
import { RADIO_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McRadio" });

// props
const props = defineProps<RadioProps>();

// emits
defineEmits<RadioEmits>();

// inject
const radioContext = inject<RadioGroupContext | undefined>(
  RADIO_INJECTION_KEY,
  void 0
);

// input ref
const inputRef = ref<HTMLInputElement>();

// use focus controller
const { wrapperRef, isFocused, handleFocus, handleBlur } =
  useFocusController(inputRef);

// selected
const isSelected = computed(() => {
  return radioContext?.modelValue?.value === props.value;
});

// disabled
const isDisabled = computed(() => {
  return radioContext?.disabled?.value || formDisabled.value;
});

// use form validate hook
const { formItem, formDisabled, validateStyle } = useFormValidate();

// select event
const handleSelect = async () => {
  if (isDisabled.value) return;
  radioContext?.handleSelect(props.value);
  await nextTick();
  formItem?.validate("input");
};
</script>

<style scoped lang="scss">
@use "./styles/mc-radio.scss";
</style>
