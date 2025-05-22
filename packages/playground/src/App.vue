<template>
  <div class="container">
    <div class="show-value">
      <span>Select Value: {{ selectValue }}</span>
    </div>
    <div>
      <mc-select v-model="selectValue">
        <mc-select-group label="Grade 3" />
        <mc-select-option value="Yui" label="Option Yui 18" />
        <mc-select-option value="Mio" label="Option Mio 18" />
        <mc-select-option value="Ritsu" label="Option Ritsu 18" />
        <mc-select-option value="Mugi" label="Option Mugi 18" />
        <mc-select-group label="Grade 2" />
        <mc-select-option value="Azusa" label="Option Azusa 17" />
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
import McSelectGroup from "@mc-plus/components/mc-select/mc-select-group.vue";

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
</style>
