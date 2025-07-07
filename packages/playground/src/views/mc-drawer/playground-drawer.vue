<template>
  <div class="playground-drawer">
    <div class="drawer-container" id="drawer-container">
      <div class="drawer-content">
        <mc-drawer
          v-model="drawerVisible"
          title="Mc Drawer"
          :fixed="false"
          size="medium"
          :port-css-selector="'#drawer-container'"
        >
          <div>Drawer Content</div>
        </mc-drawer>
        <div class="tool-bar">
          <mc-button @click="handleShowDrawer">Show Drawer</mc-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McDrawer from "../../../../components/mc-drawer/mc-drawer.vue";

const drawerVisible = ref<boolean>(false);

const handleShowDrawer = () => {
  console.log("show drawer");
  drawerVisible.value = true;
};
</script>

<style scoped lang="scss">
.playground-drawer {
  width: 100%;
  height: 100%;
  position: relative;
  .drawer-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .drawer-content {
      width: 100%;
      height: 3000px;
      background-color: lightblue;
      .tool-bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: lightcoral;
      }
    }
  }
}
</style>
