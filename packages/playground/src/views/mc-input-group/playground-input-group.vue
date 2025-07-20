<template>
  <div class="playground-input-group">
    <mc-input-group>
      <template #prefix>
        <mc-input
          width="100%"
          height="100%"
          v-model="amount"
          placeholder="Please enter amount"
          input-group-position="prefix"
        />
      </template>
      <template #suffix>
        <mc-select-plus
          width="100%"
          height="100%"
          v-model="currency"
          placeholder="Please select currency"
          search
          clearable
          placement="bottom-end"
          input-group-position="suffix"
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
      </template>
    </mc-input-group>
  </div>
</template>

<script setup lang="ts">
import McInputGroup from "../../../../components/mc-input-group/mc-input-group.vue";
import McInput from "../../../../components/mc-input/mc-input.vue";
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
import McSelectGroupPlus from "../../../../components/mc-select-plus/mc-select-group-plus.vue";
import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";
import { reactive, ref } from "vue";

const amount = ref<string>("");

const currency = ref<string>("");

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
</script>

<style scoped lang="scss">
.playground-input-group {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
