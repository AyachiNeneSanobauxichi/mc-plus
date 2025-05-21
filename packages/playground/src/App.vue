<template>
  <div class="container">
    <div class="show-value">
      <span>Disabled: {{ disabled }}</span>
      <span>Input Value: {{ inputValue }}</span>
    </div>
    <div>
      <mc-input
        :disabled="disabled"
        v-model="inputValue"
        search
        password
        @change="handleChange"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Change disabled</mc-button>
      <mc-button @click="handleSetValue">Set Value</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McInput from "@mc-plus/components/mc-input/mc-input.vue";

const inputValue = ref<string>("");

const disabled = ref<boolean>(false);
const changeDisabled = () => {
  disabled.value = !disabled.value;
};

const handleSetValue = () => {
  inputValue.value = "Hello World";
};

const handleChange = () => {
  console.log("Change: ", inputValue.value);
};

const handleInput = () => {
  console.log("Input: ", inputValue.value);
};

const handleFocus = () => {
  console.log("Handle Focus");
};

const handleBlur = () => {
  console.log("Handle Blur");
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .content {
    width: 320px;
    background-color: pink;
  }

  .show-value {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tool-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: 0;
  }
}
</style>
