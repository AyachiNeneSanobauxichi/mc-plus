<template>
  <div class="playground-currency-icon">
    <mc-select v-model="currency">
      <mc-select-option
        v-for="item in currencyList"
        :key="item.value"
        :value="item.value"
      >
        <mc-currency-icon
          :currency="item.value"
          :desc="item.desc"
          direction="horizontal"
          cdn-url="https://d1850j7ztm58xd.cloudfront.net/trader-site-v3-static/currency"
        ></mc-currency-icon>
      </mc-select-option>
    </mc-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McCurrencyIcon from "../../../../components/mc-currency-icon/mc-currency-icon.vue";
import McSelect from "../../../../components/mc-select/mc-select.vue";
import McSelectOption from "../../../../components/mc-select/mc-select-option.vue";

const currency = ref<string>("USD");

const currencyList = [
  {
    label: "USD",
    value: "USD",
    desc: "US Dollar",
  },
  {
    label: "EUR",
    value: "EUR",
    desc: "Euro",
  },
];
</script>

<style scoped lang="scss"></style>
