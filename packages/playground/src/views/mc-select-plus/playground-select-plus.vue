<template>
  <div class="playground-select-plus">
    <div class="tool-bar">
      <span>currency: {{ currency }}</span>
      <mc-button @click="handleDisabled">Disabled</mc-button>
    </div>
    <mc-select-plus
      v-model="currency"
      placeholder="Please select currency"
      width="400px"
      search
      clearable
      :disabled="isDisabled"
    >
      <template v-for="item in currencyList" :key="item.value">
        <mc-select-group-plus :label="item.label">
          <mc-select-option-plus
            v-for="child in item.children"
            :key="child.value"
            :label="child.label"
            :value="child.value"
          >
          </mc-select-option-plus>
        </mc-select-group-plus>
      </template>
    </mc-select-plus>
  </div>
</template>

<script setup lang="ts">
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
import McSelectGroupPlus from "../../../../components/mc-select-plus/mc-select-group-plus.vue";
import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";
import { reactive, ref } from "vue";
import { McButton } from "mc-plus";

const currency = ref<string>("USD");

const currencyList = reactive([
  {
    label: "Fiat",
    value: "fiat",
    children: [
      { label: "USD", value: "USD" },
      { label: "EUR", value: "EUR" },
      { label: "GBP", value: "GBP" },
      { label: "JPY", value: "JPY" },
      { label: "KRW", value: "KRW" },
      { label: "CNY", value: "CNY" },
      { label: "HKD", value: "HKD" },
      { label: "AUD", value: "AUD" },
      { label: "CAD", value: "CAD" },
      { label: "CHF", value: "CHF" },
    ],
  },
  {
    label: "Crypto",
    value: "crypto",
    children: [
      { label: "BTC", value: "BTC" },
      { label: "ETH", value: "ETH" },
      { label: "SOL", value: "SOL" },
      { label: "XRP", value: "XRP" },
      { label: "ADA", value: "ADA" },
    ],
  },
]);

const isDisabled = ref<boolean>(false);

const handleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style scoped lang="scss">
.playground-select-plus {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .tool-bar {
    margin-bottom: 32px;
  }
}
</style>
