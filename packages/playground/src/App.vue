<template>
  <div class="container">
    <div class="show-value">
      <span>Value: {{ selectValue }}</span>
    </div>
    <div>
      <mc-radio-group v-model="selectValue" :disabled="disabled">
        <mc-radio value="1" remark="Remark 1">Option 1</mc-radio>
        <mc-radio value="2">Option 2</mc-radio>
        <mc-radio value="3">Option 3</mc-radio>
      </mc-radio-group>
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
import McRadio from "../../components/mc-radio/mc-radio.vue";
import McRadioGroup from "../../components/mc-radio/mc-radio-group.vue";

const selectValue = ref<string>("1");

const handleSetValue = () => {
  selectValue.value = "1";
};

const disabled = ref<boolean>(false);

const changeDisabled = () => {
  disabled.value = !disabled.value;
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

.currency-option {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }

  .currency-option-content-name {
    font-weight: 700;
    color: #222;
    font-size: 14px;
  }

  .currency-option-content-desc {
    color: #808080;
    font-size: 12px;
  }
}
</style>
