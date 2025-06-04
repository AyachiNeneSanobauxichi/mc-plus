<template>
  <div class="container">
    <div class="show-value">
      <div>Disabled: {{ disabled }}</div>
    </div>
    <div class="content">
      <mc-drawer title="Mc Drawer"></mc-drawer>
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Disable</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McDrawer from "../../components/mc-drawer/mc-drawer.vue";
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
    width: 100%;
  }

  .tool-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: -200px;
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
