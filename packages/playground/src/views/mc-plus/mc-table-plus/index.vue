<template>
  <div class="playground-table-plus">
    <mc-tab v-model="activeTab" type="primary" wrapper-padding="32px">
      <mc-tab-item name="position" label="Position">
        <position-table></position-table>
      </mc-tab-item>
      <mc-tab-item name="open-order" label="Open Orders">
        <open-order-table></open-order-table>
      </mc-tab-item>
      <mc-tab-item name="order-history" label="Order History">
        <order-history-table></order-history-table>
      </mc-tab-item>
    </mc-tab>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McTab, McTabItem } from "mc-plus";
import PositionTable from "./tables/position-table/index.vue";
import OpenOrderTable from "./tables/open-order-table/index.vue";
import OrderHistoryTable from "./tables/order-history-table/index.vue";

// active tab
const activeTab = ref("position");
</script>

<style scoped lang="scss"></style>
