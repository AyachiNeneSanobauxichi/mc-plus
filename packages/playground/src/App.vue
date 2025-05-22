<template>
  <div class="container">
    <div class="show-value">
      <span>Select Value: {{ selectValue }}</span>
    </div>
    <div>
      <mc-select v-model="selectValue" type="multi-choice">
        <mc-select-option value="1" label="Option 1" />
        <mc-select-option value="2" label="Option 2" />
        <mc-select-option value="3" label="Option 3" />
        <mc-select-option value="4" label="Option 4" />
        <mc-select-option value="5" label="Option 5" />
      </mc-select>
    </div>
    <div class="tool-bar">
      <!-- <mc-button @click="changeDisabled">Change disabled</mc-button> -->
      <mc-button @click="handleSetValue">Set Value</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McSelect from "@mc-plus/components/mc-select/mc-select.vue";
import McSelectOption from "@mc-plus/components/mc-select/mc-select-option.vue";

const selectValue = ref<string[]>([]);

const handleSetValue = () => {
  selectValue.value = ["1", "2"];
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
