<template>
  <div class="playground-secondary-menu">
    <mc-secondary-menu
      v-model="activeTab"
      :options="options"
    ></mc-secondary-menu>
  </div>
</template>

<script setup lang="ts">
import type { SecondaryMenuItem } from "@mc-plus/components/mc-secondary-menu";
import { ref } from "vue";
import McSecondaryMenu from "../../../../components/mc-secondary-menu/mc-secondary-menu.vue";

const activeTab = ref<string>("3-1");

const options = ref<SecondaryMenuItem[]>([
  {
    name: "1",
    label: "Wallets",
  },
  {
    name: "2",
    label: "Ledger",
    children: [
      {
        name: "2-1",
        label: "Overview",
      },
      {
        name: "2-2",
        label: "Transaction Details",
      },
    ],
  },
  {
    name: "3",
    label: "Settings",
    children: [
      {
        name: "3-1",
        label: "Payment Request Settings",
      },
    ],
  },
  {
    name: "4",
    label: "User Management",
  },
]);
</script>

<style scoped lang="scss"></style>
