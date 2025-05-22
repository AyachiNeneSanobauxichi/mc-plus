<!--
 * @Author: Tieju yang
 * @Date: 2025-05-20 08:54:42
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 10:23:32
-->
<template>
  <label
    ref="_ref"
    class="mc-radio mc-radio--large"
    :class="{
      'is-disabled': isDisabled,
      'is-checked': isChecked,
    }">
    <span class="mc-radio__input">
      <span class="mc-radio__inner"></span>
      <input class="mc-radio__original" type="radio" :value="_value" :disabled="isDisabled" v-model="radioValue" />
    </span>
    <span class="mc-radio__label">
      <span v-if="label">{{ label }}</span>
      <slot v-else></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref, toRefs } from "vue";
import type { RadioEmits, RadioGroupContext, RadioInstance, RadioProps } from "./types";

// options
defineOptions({
  name: "McRadio",
});

// props
const props = withDefaults(defineProps<RadioProps>(), {});
const { modelValue, value: _value, disabled, label } = toRefs(props);

// emits
const emit = defineEmits<RadioEmits>();

// ref
const _ref = ref<HTMLElement>();

const radioGroup = inject<RadioGroupContext | undefined>("radioGroup", undefined);

// computed
const isDisabled = computed(() => {
  return radioGroup ? radioGroup.disabled?.value || disabled.value : disabled.value;
});

const isChecked = computed(() => {
  const checkValue = radioGroup ? radioGroup.value.value : modelValue.value;
  return checkValue === _value.value;
});

// v-model
const radioValue = computed({
  get() {
    return radioGroup ? radioGroup.value.value : modelValue.value;
  },
  set(val: string | number | boolean) {
    if (radioGroup) {
      radioGroup.change(val);
    } else {
      emit("update:modelValue", val);
      emit("change", val);
    }
  },
});

// expose
defineExpose<RadioInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
