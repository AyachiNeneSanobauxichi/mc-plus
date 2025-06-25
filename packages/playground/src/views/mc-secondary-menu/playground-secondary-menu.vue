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
        <component
          :is="currentComponent"
          :key="activeTab"
          :ref="setComponentRef"
        />
      </div>
    </div>
    <div class="tool-bar">
      <mc-button @click="initMethod">Init Method</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  SecondaryMenuItem,
  SecondaryMenuValue,
} from "@mc-plus/components/mc-secondary-menu";
import {
  computed,
  ref,
  watch,
  shallowRef,
  type Component,
  type ShallowRef,
  onMounted,
} from "vue";
import { McButton } from "mc-plus";
import McSecondaryMenu from "../../../../components/mc-secondary-menu/mc-secondary-menu.vue";
import Wallets from "./components/wallets.vue";
import LedgerOverview from "./components/ledger-overview.vue";
import LedgerTransactionDetails from "./components/ledger-transaction-details.vue";
import PaymentRequestSettings from "./components/payment-request-settings.vue";
import UserManagement from "./components/user-management.vue";

const activeTab = ref<string>("3-1");

const components = ref<Record<string, ShallowRef<Component>>>({
  "1": shallowRef(Wallets),
  "2-1": shallowRef(LedgerOverview),
  "2-2": shallowRef(LedgerTransactionDetails),
  "3-1": shallowRef(PaymentRequestSettings),
  "4": shallowRef(UserManagement),
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

const componentRef = ref<Component>();

const setComponentRef = (el: Component) => {
  componentRef.value = el;
};

const initMethod = () => {
  (componentRef.value as any)?.initPage();
};

onMounted(() => {
  initMethod();
});

watch(activeTab, () => {
  initMethod();
});
</script>

<style scoped lang="scss">
.playground-secondary-menu {
  .walletx-container {
    display: flex;
    gap: 24px;
  }

  .tool-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
