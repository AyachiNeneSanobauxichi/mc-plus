<template>
  <div
    class="mc-input"
    :class="{
      'mc-input--disabled': isDisabled,
      'mc-input--focused': isFocused,
      'mc-input--inputed': modelValue,
      'mc-input-hovering': isHovering,
      [validateStyle]: validateStyle,
    }"
    :style="{ width, height }"
    ref="wrapperRef"
  >
    <div class="mc-input__prefix" v-if="$slots.prefix || prefixIcon">
      <slot name="prefix">
        <mc-icon
          class="mc-input-icon"
          v-if="prefixIcon"
          :name="prefixIcon"
          :size="24"
        />
      </slot>
    </div>
    <input
      class="mc-input__inner"
      ref="inputRef"
      :id="formId"
      :type="isPassword ? (passwordVisible ? 'text' : 'password') : 'text'"
      :disabled="isDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :maxlength="maxlength"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.delete="handleDelete"
      @paste="handlePaste"
    />
    <template v-if="statusIcon">
      <div class="mc-input__status" :class="validateStyle">
        <mc-icon :name="statusIcon" :size="24" />
      </div>
    </template>
    <template v-if="type === 'password'">
      <div class="mc-input__password">
        <mc-icon
          class="mc-input-icon"
          :name="passwordVisible ? 'Review-Hidden' : 'Review'"
          :size="24"
          @click="togglePassword"
        />
      </div>
    </template>
    <template v-else>
      <div class="mc-input__suffix" v-if="$slots.suffix || suffixIcon">
        <slot name="suffix">
          <mc-icon v-if="suffixIcon" :name="suffixIcon" :size="24" />
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InputEmits, InputProps } from "./types";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { isFunction, isNil, toString } from "lodash-es";
import { useFocus, useHover } from "@mc-plus/hooks";
import McIcon from "../mc-icon/mc-icon.vue";
import { useInputGroupCtx } from "../mc-input-group/hooks";
import { useFormValidate } from "../mc-form/hooks";
import {
  currencyFormatter,
  currencyParser,
  numberFormatter,
  numberParser,
} from "./formatter";
import { useCursor } from "./hooks";

// options
defineOptions({ name: "McInput" });

// props
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
  autofocus: false,
  clearable: false,
  disabled: false,
  placeholder: "Please enter",
  readonly: false,
  disableValidation: false,
});
const { formatter, parser } = props;

// emit
const emit = defineEmits<InputEmits>();

// input ref
const inputRef = ref<HTMLInputElement>();

// native input value
const nativeValue = computed(() =>
  isNil(props.modelValue) ? "" : toString(props.modelValue)
);

// handle formatter
const handleFormatter = (value: string) => {
  if (props.type === "number") {
    // number formatter
    value = numberFormatter(value);
  } else if (props.type === "currency") {
    // currency formatter
    value = currencyFormatter(value);
  }

  // custom formatter
  if (isFunction(formatter)) {
    value = formatter(value);
  }

  return value;
};

// handle parser
const handleParser = (value: string) => {
  if (props.type === "number") {
    // number parser
    value = numberParser(value);
  } else if (props.type === "currency") {
    // currency parser
    value = currencyParser(value, props.currencyAccuracy);
  }

  // custom parser
  if (isFunction(parser)) {
    value = parser(value);
  }

  return value;
};

// set native value
const setNativeValue = () => {
  const _input = inputRef.value;
  const _value = handleFormatter(nativeValue.value);
  if (!_input || _input.value === _value) return;
  _input.value = _value;
};

// init native value
onMounted(() => {
  setNativeValue();
});

// password visible
const passwordVisible = ref<boolean>(false);

// show clear
// const showClear = computed(() => props.clearable && !!innerValue.value);

// password
const isPassword = computed(() => props.type === "password");

// use form validate hook
const {
  formItem,
  formId,
  formDisabled: isDisabled,
  validateStyle,
  statusIcon,
} = useFormValidate({
  externalDisabled: computed(() => !!inputGroupCtx?.inputGroupDisabled.value),
});

// use focus controller
const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocus(inputRef, {
  afterBlur() {
    // after blur validate
    formItem?.validate("blur");
  },
});

// use hover
const { isHovering } = useHover(wrapperRef);

// use input group ctx
const inputGroupCtx = useInputGroupCtx({
  validateStatus: computed(() => formItem?.validateStatus || "init"),
  isFocused,
  isHovering,
});

// clear
const clear = () => {
  const _value = "";
  // dispatch events
  emit("update:modelValue", _value);
  emit("input", _value);
  emit("change", _value);
  emit("clear");
  // clear validate
  formItem?.clearValidate();
};

// delete
const handleDelete = () => {
  emit("delete");
};

// paste
const handlePaste = (e: ClipboardEvent) => {
  emit("paste", e);
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

// accuracy changed
watch(
  () => props.currencyAccuracy,
  () => {
    emit("update:modelValue", handleParser(nativeValue.value));
  }
);

// cursor hook
const { recordCursor, setCursor } = useCursor(inputRef);

// input event
const handleInput = async (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  recordCursor();
  emit("update:modelValue", handleParser(value));
  emit("input", handleParser(value));
  await nextTick();
  setNativeValue();
  setCursor();
  formItem?.validate("input");
};

// change event
const handleChange = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emit("change", handleParser(value));
};

// toggle password
const togglePassword = () => {
  if (isDisabled.value) return;
  passwordVisible.value = !passwordVisible.value;
};

// disable changed
watch(
  () => isDisabled.value,
  (val) => {
    // set password visible to false when disabled
    if (val) passwordVisible.value = false;
  }
);

// model value changed
watch(nativeValue, () => {
  setNativeValue();
});

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
