<template>
  <div class="child-tab">
    <mc-tab v-model="activeTab">
      <mc-tab-item :name="1" label="Child Tab 1">Child Tab 1</mc-tab-item>
      <mc-tab-item :name="2" label="Child Tab 2">Child Tab 2</mc-tab-item>
      <mc-tab-item :name="3" label="Child Tab 3">Child Tab 3</mc-tab-item>
    </mc-tab>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McTab from "../../../../../components/mc-tab/mc-tab.vue";
import McTabItem from "../../../../../components/mc-tab/mc-tab-item.vue";

const activeTab = ref<number>(1);
</script>

<style scoped lang="scss"></style>
