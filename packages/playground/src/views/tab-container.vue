<template>
  <div class="tab-container">
    <mc-tab v-model="activeTab"></mc-tab>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McTab from "../../../components/mc-tab/mc-tab.vue";

const activeTab = ref("tab-3");
</script>

<style scoped lang="scss">
.tab-container {
  width: 1200px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
