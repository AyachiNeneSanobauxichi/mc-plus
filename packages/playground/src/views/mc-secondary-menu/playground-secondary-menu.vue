<template>
  <div class="playground-secondary-menu">
    <div class="walletx-container">
      <div class="walletx-menu">
        <mc-secondary-menu
          v-model="activeTab"
          :options="options"
          @change="handleChange"
        ></mc-secondary-menu>
      </div>
      <div class="walletx-content">
        <component :is="currentComponent" :key="activeTab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  SecondaryMenuItem,
  SecondaryMenuValue,
} from "@mc-plus/components/mc-secondary-menu";
import { computed, ref, type Component } from "vue";
import McSecondaryMenu from "../../../../components/mc-secondary-menu/mc-secondary-menu.vue";
import Wallets from "./components/wallets.vue";
import LedgerOverview from "./components/ledger-overview.vue";
import LedgerTransactionDetails from "./components/ledger-transaction-details.vue";
import PaymentRequestSettings from "./components/payment-request-settings.vue";
import UserManagement from "./components/user-management.vue";

const activeTab = ref<string>("3-1");

const components = ref<Record<string, Component>>({
  "1": Wallets,
  "2-1": LedgerOverview,
  "2-2": LedgerTransactionDetails,
  "3-1": PaymentRequestSettings,
  "4": UserManagement,
});

const currentComponent = computed(() => {
  return components.value[activeTab.value];
});

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

const handleChange = (value: SecondaryMenuValue) => {
  console.log("Value: ", value);
};
</script>

<style scoped lang="scss">
.playground-secondary-menu {
  .walletx-container {
    display: flex;
    gap: 24px;
  }
}
</style>
