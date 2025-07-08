<template>
  <div>code: {{ code }}</div>
  <div class="mc-otp" :class="{ 'mc-otp-disabled': props.disabled }">
    <div class="mc-otp-input-container">
      <div class="mc-otp-input-item" v-for="index in props.length" :key="index">
        <mc-input
          v-model="code[index - 1]"
          :placeholder="''"
          width="40px"
          height="40px"
          :maxlength="1"
          :ref="(el) => setRef(index - 1, el as unknown as InputInstance)"
          @input="handleInput(index - 1, $event)"
        />
      </div>
    </div>
    <mc-icon name="Accept_02" :size="24" />
  </div>
</template>

<script setup lang="ts">
import type { OtpProps, OtpEmits } from "./types";
import type { InputInstance } from "../mc-input";
import { reactive, ref, watchEffect } from "vue";
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
const code = reactive(new Array(props.length).fill(""));

// input
const handleInput = (index: number, value: string) => {
  code[index] = value;

  if (value && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus();
  }
};

// model value length check
watchEffect(() => {
  if (props.modelValue?.length ?? 0 > props.length) {
    throw new Error("modelValue length is greater than length.");
  }
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
