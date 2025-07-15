<template>
  <div class="playground-select-plus">
    <template v-for="item in currencyList" :key="item.value">
      <mc-select-option-plus :value="item.value">
        {{ item.label }}
      </mc-select-option-plus>
    </template>
  </div>
</template>

<script setup lang="ts">
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";
import { reactive } from "vue";

const currencyList = reactive([
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
]);
</script>

<style scoped lang="scss">
.playground-select-plus {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
