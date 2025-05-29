<template>
  <div
    class="mc-input"
    :class="{
      'mc-input--disabled': isDisabled,
      'mc-input--focused': isFocused,
      'mc-input--inputed': modelValue,
    }"
    ref="wrapperRef"
  >
    <input
      class="mc-input__inner"
      ref="inputRef"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :disabled="isDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :autofocus="autofocus"
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputEmits, InputProps } from "./types";
import { computed, nextTick, ref, watch } from "vue";
// import McIcon from "../mc-icon/mc-icon.vue";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";
import { useFocusController } from "@mc-plus/hooks";

// options
defineOptions({ name: "McInput", inheritAttrs: false });

// props
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
  autofocus: false,
  clearable: false,
  disabled: false,
  placeholder: "Please enter",
  readonly: false,
  showPassword: false,
});

// emit
const emit = defineEmits<InputEmits>();

// input ref
const inputRef = ref<HTMLInputElement>();

// current value
const innerValue = ref<string>(props.modelValue);

// password visible
const passwordVisible = ref<boolean>(false);

// show clear
const showClear = computed(() => props.clearable && !!innerValue.value);

// disabled
const isDisabled = useFormDisabled();

// form item
const { formItem } = useFormItem();

// use focus controller
const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
  inputRef,
  {
    afterBlur() {
      // after blur validate
      formItem?.validate("blur");
    },
  }
);

// clear
const clear = () => {
  innerValue.value = "";
  // dispatch events
  emit("update:modelValue", innerValue.value);
  emit("input", innerValue.value);
  emit("change", innerValue.value);
  emit("clear");
  // clear validate
  formItem?.clearValidate();
};

// focus
const focus = async () => {
  await nextTick();
  inputRef.value?.focus();
};

// blur
const blur = async () => {
  inputRef.value?.blur();
};

// select
const select = () => {
  inputRef.value?.select();
};

// input event
const handleInput = () => {
  emit("update:modelValue", innerValue.value);
  emit("input", innerValue.value);
};

// change event
const handleChange = () => {
  emit("change", innerValue.value);
};

// toggle password
const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
};

// model value changed
watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value;
    formItem?.validate("change");
  }
);

// expose
defineExpose({
  ref: inputRef,
  focus,
  blur,
  select,
  clear,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
