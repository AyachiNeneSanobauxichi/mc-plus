<template>
  <div class="page-header">
    <mc-button @click="handleShowDrawer">Show Drawer</mc-button>
  </div>
  <div class="main" id="main-content">
    <div class="main-content">
      <div>Content</div>
      <mc-drawer
        v-model="drawerVisible"
        title="Mc Drawer"
        :fixed="false"
        size="medium"
        :port-css-selector="'#main-content'"
      ></mc-drawer>
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
.page-header {
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  background-color: lightblue;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.main {
  width: 100%;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  .main-content {
    width: 100%;
    height: 6000px;
    background-color: pink;
  }
}
</style>
