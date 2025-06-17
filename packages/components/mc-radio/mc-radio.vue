<template>
  <div class="mc-radio" :class="{ 'mc-radio-has-remark': !!remark }">
    <label
      class="mc-radio-label"
      :class="{
        'mc-radio-checked': isSelected,
        'mc-radio-disabled': isDisabled,
        'mc-radio-error': isError,
      }"
      @click="handleSelect"
    >
      <input type="radio" class="mc-radio-input" :disabled="disabled" />
      <span class="mc-radio-circle"></span>
      <div class="mc-radio-content">
        <slot>{{ label }}</slot>
      </div>
      <div class="mc-radio-help" v-if="help || $slots.help">
        <slot name="help">
          <mc-tooltip :content="help" :icon-size="24" />
        </slot>
      </div>
    </label>
    <div class="mc-radio-remark">
      <slot name="remark">{{ remark }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RadioGroupContext, RadioProps } from "./types";
import { computed, inject } from "vue";
import McTooltip from "../mc-tooltip/mc-tooltip.vue";
import { RADIO_INJECTION_KEY } from "./constant";
import { useFormDisabled } from "../mc-form/hooks";

// options
defineOptions({ name: "McRadio" });

// props
const props = defineProps<RadioProps>();

// inject
const radioContext = inject<RadioGroupContext>(RADIO_INJECTION_KEY);

// selected
const isSelected = computed(() => {
  return radioContext?.modelValue?.value === props.value;
});

// form item disable
const disabled = useFormDisabled();

// disabled
const isDisabled = computed(() => {
  return radioContext?.disabled?.value || disabled.value;
});

// error
const isError = computed(() => {
  return !isDisabled.value && radioContext?.hasError?.value;
});

// select event
const handleSelect = () => {
  if (isDisabled.value) return;
  radioContext?.handleSelect(props.value);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-radio.scss";
</style>
