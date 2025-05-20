<!--
 * @Author: Tieju yang
 * @Date: 2025-05-20 08:54:42
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-20 11:16:22
-->
<template>
  <label
    ref="_ref"
    class="mc-radio"
    :class="{
      [`mc-radio--${radioSize}`]: radioSize,
      'is-disabled': isDisabled,
      'is-checked': isChecked,
      'is-bordered': border,
    }">
    <span class="mc-radio__input">
      <span class="mc-radio__inner"></span>
      <input class="mc-radio__original" type="radio" :name="name" :value="_value" :disabled="isDisabled" v-model="radioValue" />
    </span>
    <span class="mc-radio__label">
      <slot>{{ label }}</slot>
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
const props = withDefaults(defineProps<RadioProps>(), {
  size: "medium",
});
const { modelValue, value: _value, disabled, size, name, label } = toRefs(props);

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

const radioSize = computed(() => {
  return radioGroup ? radioGroup.size?.value : size.value;
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
