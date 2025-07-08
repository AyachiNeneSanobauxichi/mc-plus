<template>
  <div class="mc-otp" :class="{ 'mc-otp-disabled': props.disabled }">
    <div class="mc-otp-input-container">
      <div
        class="mc-otp-input-item"
        v-for="index in props.length"
        :key="index"
        @click="handleClick(index - 1)"
      >
        <mc-input
          v-model="code[index - 1]"
          :placeholder="''"
          type="number"
          width="40px"
          height="40px"
          :maxlength="1"
          :form-validate="false"
          :ref="(el) => setRef(index - 1, el as unknown as InputInstance)"
          @input="handleInput(index - 1, $event)"
          @delete="handleBackspace(index - 1)"
          @paste="handlePaste($event)"
        />
      </div>
    </div>
    <mc-icon name="Accept_02" :size="24" />
  </div>
</template>

<script setup lang="ts">
import type { OtpProps, OtpEmits } from "./types";
import type { InputInstance } from "../mc-input";
import { reactive, ref, watch, watchEffect } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import McInput from "../mc-input/mc-input.vue";

// options
defineOptions({ name: "McOtp" });

// props
const props = withDefaults(defineProps<OtpProps>(), {
  disabled: false,
  length: 6,
});

// emits
const emits = defineEmits<OtpEmits>();

// refs
const inputRefs = ref<InputInstance[]>([]);

// set ref
const setRef = (index: number, el: InputInstance) => {
  (inputRefs.value as unknown as InputInstance[])[index] = el;
};

// code
const code = reactive(new Array(props.length));

// input
const handleInput = (index: number, value: string) => {
  code[index] = value;

  if (value && index < props.length - 1) {
    setFocus(index + 1);
  }

  handleValueChanged();
};

// paste
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pasteData =
    event.clipboardData?.getData("text").slice(0, props.length) || "";
  setCode(pasteData);
  handleValueChanged();
  setFocus(pasteData.length - 1);
};

// backspace
const handleBackspace = (index: number) => {
  if (!code[index] && index > 0) {
    setFocus(index - 1);
  }
};

// click
const handleClick = (index: number) => {
  if (!code[index]) {
    setFocus(props.modelValue?.length ?? 0);
  }
};

// set focus
const setFocus = (index: number) => {
  inputRefs.value[index]?.focus();
};

// set code
const setCode = (value?: string) => {
  code.forEach((_, index) => {
    code[index] = value?.[index] || "";
  });
};

// model value changed
watch(
  () => props.modelValue,
  (value) => {
    setCode(value);
  },
  { immediate: true }
);

// value changed
const handleValueChanged = () => {
  emits("change", code.join(""));
  emits("update:modelValue", code.join(""));
};

// model value length check
watchEffect(() => {
  if ((props.modelValue?.length ?? 0) > props.length) {
    throw new Error("modelValue length is greater than length.");
  }
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
