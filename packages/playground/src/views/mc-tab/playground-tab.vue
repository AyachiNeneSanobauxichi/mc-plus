<template>
  <div class="playground-tab">
    <mc-tab v-model="activeTab" type="primary">
      <mc-tab-item name="Yui" label="Hirasawa Yui">
        <tab1></tab1>
      </mc-tab-item>
      <mc-tab-item name="Azusa" label="Nakano Azusa">
        <tab2></tab2>
      </mc-tab-item>
      <mc-tab-item name="Mio" label="Akiyama Mio">
        <tab3></tab3>
      </mc-tab-item>
      <mc-tab-item name="Ritsu" label="Tainaka Ritsu">
        <tab4></tab4>
      </mc-tab-item>
      <mc-tab-item name="Mugi" label="Kotobuku Tsumugi">
        <tab5></tab5>
      </mc-tab-item>
    </mc-tab>
    <div class="tool-bar">
      <mc-button @click="handleAddTab">Add tab</mc-button>
      <mc-button @click="handleChangeDisable">Change disable</mc-button>
      <mc-button @click="handleAddNumber">Add number</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McTab from "../../../../components/mc-tab/mc-tab.vue";
import McTabItem from "../../../../components/mc-tab/mc-tab-item.vue";
import Tab1 from "./tabs/tab1.vue";
import Tab2 from "./tabs/tab2.vue";
import Tab3 from "./tabs/tab3.vue";
import Tab4 from "./tabs/tab4.vue";
import Tab5 from "./tabs/tab5.vue";

const activeTab = ref("Mio");

const handleAddTab = () => {
  // tabItems.value.push({ label: "Hirasawa Ui", name: "Ui" });
};

const handleChangeDisable = () => {
  // tabItems.value[3].disabled = !tabItems.value[3].disabled;
};

const handleAddNumber = () => {
  // tabItems.value[1].count = (tabItems.value[1].count ?? 0) + 1;
};
</script>

<style scoped lang="scss">
.playground-tab {
  .tool-bar {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
