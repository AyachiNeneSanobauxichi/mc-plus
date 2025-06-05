<template>
  <div>
    <div id="drawer"></div>
    <DrawerContainer />
  </div>
</template>

<script setup lang="ts">
import DrawerContainer from "./views/drawer-container.vue";
</script>

<style scoped lang="scss">
#drawer {
  width: 100%;
  height: 800px;
  background-color: lightgreen;
  position: relative;
}
</style>
