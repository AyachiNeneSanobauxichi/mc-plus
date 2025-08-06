<template>
  <div
    :id="formId"
    class="mc-otp"
    :class="{
      'mc-otp-disabled': formDisabled,
      [validateStyle]: validateStyle,
    }"
  >
    <ul class="mc-otp-input-list">
      <li
        v-for="index in props.length"
        :key="index"
        class="mc-otp-input-item"
        :class="{
          'mc-otp-input-item-focus': focusIndex === index - 1,
        }"
        :ref="(el) => setItemRef(index - 1, el as HTMLElement)"
        @click="handleClick(index - 1)"
      >
        <input
          v-model="code[index - 1]"
          class="mc-otp-input"
          type="number"
          :disabled="formDisabled"
          @input="(e) => handleInput(index - 1, e as InputEvent)"
          @paste="handlePaste($event)"
          @keydown.backspace.prevent.stop="handleBackspace(index - 1)"
          @mousedown.prevent
          @keydown.left.prevent.stop="setFocus(index - 2)"
          @keydown.right.prevent.stop="setFocus(index)"
          @keydown.tab.prevent.stop
        />
      </li>
    </ul>
    <mc-icon
      v-if="statusIcon"
      class="mc-otp-status-icon"
      :name="statusIcon"
      :size="24"
    />
  </div>
</template>

<script setup lang="ts">
import type { OtpProps, OtpEmits } from "./types";
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { isEmpty } from "lodash-es";
import McIcon from "../mc-icon/mc-icon.vue";
import { useFormValidate } from "../mc-form/hooks";
import { MC_OTP } from "./constant";
import { useOtpFocus } from "./hooks";

// options
defineOptions({ name: MC_OTP });

// props
const props = withDefaults(defineProps<OtpProps>(), {
  disabled: false,
  length: 6,
});

// emits
const emits = defineEmits<OtpEmits>();

// input item refs
const inputItemRefs = ref<HTMLElement[]>([]);

// set ref
const setItemRef = (index: number, el: HTMLElement | null) => {
  if (!el) return;
  inputItemRefs.value[index] = el;
};

// code
const code = reactive(new Array(props.length));

// use otp focus
const { focusIndex, setFocus, nextFocus, prevFocus } = useOtpFocus(
  inputItemRefs,
  () => {
    formItem?.validate("blur");
  }
);

// input
const handleInput = async (index: number, event: InputEvent) => {
  if (formDisabled.value) return;
  const target = event.target as HTMLInputElement;
  let value = target.value.slice(0, 1);
  target.value = value;
  code[index] = value;

  handleValueChanged();

  if (value) {
    nextFocus();
  }
};

// use form validate hook
const { formId, formItem, formDisabled, validateStyle, statusIcon } =
  useFormValidate({
    externalDisabled: computed(() => props.disabled),
  });

// backspace
const handleBackspace = async (index: number) => {
  code[index] = "";
  handleValueChanged();
  prevFocus();
};

// paste
const handlePaste = async (event: ClipboardEvent) => {
  event.preventDefault();
  if (formDisabled.value) return;
  const pasteData =
    event.clipboardData?.getData("text").slice(0, props.length) || "";
  setCode(pasteData);
  handleValueChanged();
  nextFocus();
};

// click
const handleClick = async (index: number) => {
  // set focus
  if (isEmpty(code[index])) {
    nextFocus();
  } else {
    setFocus(index);
  }
};

// set code
const setCode = (value?: string) => {
  for (let i = 0; i < props.length; i++) {
    code[i] = value?.[i] || "";
  }
};

// init code
onMounted(() => {
  setCode(props.modelValue);
});

// model value changed
watch(
  () => props.modelValue,
  (value) => {
    setCode(value);
  }
);

// value changed
const handleValueChanged = async () => {
  emits("change", code.join(""));
  emits("update:modelValue", code.join(""));
  await nextTick();
  formItem?.validate("input");
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
