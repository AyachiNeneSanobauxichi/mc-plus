<template>
  <div class="tab-container">
    <mc-tab v-model="activeTab" type="primary">
      <template v-for="item in tabItems">
        <mc-tab-item
          :name="item.name"
          :label="item.label"
          :disabled="item.disabled"
          :count="item.count"
        >
          {{ item.label }}
        </mc-tab-item>
      </template>
    </mc-tab>
    <div class="tool-bar">
      <mc-button @click="handleAddTab">Add Tab Item</mc-button>
      <mc-button @click="handleChangeDisable">Change disabled</mc-button>
      <mc-button @click="handleAddNumber">Add number</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McTab from "../../../components/mc-tab/mc-tab.vue";
import McTabItem from "../../../components/mc-tab/mc-tab-item.vue";
import type { TabItem } from "@mc-plus/components/mc-tab/types";

const activeTab = ref("Mio");

const tabItems = ref<TabItem[]>([
  { label: "Hirasawa Yui", name: "Yui" },
  { label: "Nakano Azusa", name: "Azusa", count: 20 },
  { label: "Akiyama Mio", name: "Mio" },
  { label: "Tainaka Ritsu", name: "Ritsu", disabled: true },
  { label: "Kotobuku Tsumugi", name: "Mugi" },
]);

const handleAddTab = () => {
  tabItems.value.push({ label: "Hirasawa Ui", name: "Ui" });
};

const handleChangeDisable = () => {
  tabItems.value[3].disabled = !tabItems.value[3].disabled;
};

const handleAddNumber = () => {
  tabItems.value[1].count = (tabItems.value[1].count ?? 0) + 1;
};
</script>

<style scoped lang="scss">
.tab-container {
  width: 1200px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .tool-bar {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
