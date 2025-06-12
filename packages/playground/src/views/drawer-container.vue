<template>
  <div class="container">
    <div class="show-value">
      <div>Disabled: {{ disabled }}</div>
      <div>ShowDrawer: {{ drawerShower }}</div>
    </div>
    <div class="content">
      <mc-drawer
        v-model="drawerShower"
        title="Mc Drawer"
        size="large"
        :fixed="false"
        port-css-selector="body"
      >
        <div class="drawer-content"></div>
        <template #header-title>{{ "custom title" }}</template>
        <template #footer-right-button-group>
          <mc-button>1</mc-button>
          <mc-button>2</mc-button>
          <mc-button>3</mc-button>
        </template>
        <template #footer-desc>
          {{ "Check it" }}
        </template>
        <template #footer-left>
          <mc-button>Left</mc-button>
        </template>
      </mc-drawer>
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Disable</mc-button>
      <mc-button @click="handleShowDrawer">Show Drawer</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McDrawer from "../../../components/mc-drawer/mc-drawer.vue";
const disabled = ref<boolean>(false);

const drawerShower = ref<boolean>(false);

const handleShowDrawer = () => {
  drawerShower.value = !drawerShower.value;
};

const changeDisabled = () => {
  disabled.value = !disabled.value;
};
</script>

<style lang="scss" scoped>
.drawer-content {
  background-color: lightblue;
  width: 100%;
  height: 1500px;
}

.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .content {
    width: 100%;
    height: 600px;
    background-color: lightblue;
    // position: relative;
  }

  .tool-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    top: 300px;
    position: fixed;
    bottom: 20px;
    left: 200px;
    z-index: 9999999;
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
