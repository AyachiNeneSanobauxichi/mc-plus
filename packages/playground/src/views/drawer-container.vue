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
        :left-button="drawerConfig.leftButton"
        :middle-button="drawerConfig.middleButton"
        :right-button="drawerConfig.rightButton"
        :port-css-selector="'#drawer'"
        @previous="handlePrevious"
        @cancel="handleCancel"
        @draft="handleDraft"
        @next="handleNext"
      >
        <div class="drawer-content"></div>
      </mc-drawer>
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Disable</mc-button>
      <mc-button @click="handleShowDrawer">Show Drawer</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { McButton } from "mc-plus";
import McDrawer from "../../../components/mc-drawer/mc-drawer.vue";
import type { DrawerFooterConfig } from "@mc-plus/components/mc-drawer/types";
const disabled = ref<boolean>(false);

const drawerConfig = reactive<DrawerFooterConfig>({
  leftButton: {
    key: "previous",
    text: "Previous Step",
    leftIcon: "Corner_Arrow_Left",
    disable: false,
    hidden: false,
  },
  middleButton: {
    key: "draft",
    text: "Save as Draft",
    disable: false,
    hidden: false,
  },
  rightButton: {
    key: "next",
    text: "Next Step",
    rightIcon: "Corner_Arrow_Right",
    disable: false,
    hidden: false,
  },
});

const drawerShower = ref<boolean>(false);

const handlePrevious = () => {
  console.log("Previous");
};
const handleCancel = () => {
  console.log("Cancel");
};
const handleDraft = () => {
  console.log("Draft");
};
const handleNext = () => {
  console.log("Next");
};

const handleShowDrawer = () => {
  drawerShower.value = !drawerShower.value;
};

const changeDisabled = () => {
  disabled.value = !disabled.value;
  drawerConfig.leftButton!.disable = disabled.value;
  drawerConfig.middleButton!.disable = disabled.value;
  drawerConfig.rightButton!.disable = disabled.value;
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
