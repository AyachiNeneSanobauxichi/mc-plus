<template>
  <div class="container">
    <div class="show-value">
      <span>Select Value: {{ selectValue }}</span>
    </div>
    <div>
      <mc-select v-model="selectValue">
        <mc-select-group label="Group 1">
          <mc-select-option value="1"> Option 1 </mc-select-option>
          <mc-select-option value="2">Option 2</mc-select-option>
          <mc-select-option value="3">Option 3</mc-select-option>
        </mc-select-group>
        <mc-select-group label="Group 2">
          <mc-select-option value="4">Option 4</mc-select-option>
          <mc-select-option value="5">Option 5</mc-select-option>
        </mc-select-group>
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
import McSelect from "../../components/mc-select/mc-select.vue";
import McSelectOption from "../../components/mc-select/mc-select-option.vue";
import McSelectGroup from "../../components/mc-select/mc-select-group.vue";

const selectValue = ref<string>();

const handleSetValue = () => {
  selectValue.value = "1";
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
