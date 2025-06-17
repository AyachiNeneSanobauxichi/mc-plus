<template>
  <div class="demo-section">
    <h3>Radio Component</h3>

    <h4>Basic Radio</h4>
    <div class="demo-block">
      <mc-radio v-model="singleRadio" label="Option 1" value="1" />
      <mc-radio v-model="singleRadio" label="Option 2" value="2" />
      <div>Selected value: {{ singleRadio }}</div>
    </div>

    <h4>Radio Group</h4>
    <div class="demo-block-column">
      <mc-radio-group v-model="radioGroupValue" :disabled="disabled">
        <mc-radio value="1">Option 1</mc-radio>
        <mc-radio value="2">Option 2</mc-radio>
        <mc-radio value="3">Option 3</mc-radio>
        <mc-radio value="4">Option 4</mc-radio>
      </mc-radio-group>
      <div>Selected value: {{ radioGroupValue }}</div>
      <mc-button @click="toggleDisabled">Toggle Disabled</mc-button>
    </div>

    <h4>Disabled Radio</h4>
    <div class="demo-block">
      <mc-radio disabled value="1">Disabled Radio</mc-radio>
      <mc-radio disabled value="2" checked>Disabled & Checked Radio</mc-radio>
    </div>

    <h4>Radio Size</h4>
    <div class="demo-block">
      <mc-radio v-model="sizeRadio" value="small" size="small">Small</mc-radio>
      <mc-radio v-model="sizeRadio" value="medium" size="medium">Medium</mc-radio>
      <mc-radio v-model="sizeRadio" value="large" size="large">Large</mc-radio>
    </div>

    <h4>Vertical Radio Group</h4>
    <div class="demo-block-column">
      <mc-radio-group v-model="verticalRadioValue" direction="vertical">
        <mc-radio value="A">Option A</mc-radio>
        <mc-radio value="B">Option B</mc-radio>
        <mc-radio value="C">Option C</mc-radio>
      </mc-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { McButton, McRadio, McRadioGroup } from "mc-plus";
import { ref } from "vue";

const singleRadio = ref("1");
const radioGroupValue = ref("1");
const disabled = ref(false);
const sizeRadio = ref("medium");
const verticalRadioValue = ref("A");

const toggleDisabled = () => {
  disabled.value = !disabled.value;
};
</script>

<style scoped lang="scss">
.demo-section {
  margin-bottom: 32px;
}

.demo-block {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: 24px;
}

.demo-block-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 24px;
}

h4 {
  margin-top: 16px;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
