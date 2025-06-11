<template>
  <div class="input-group-container">
    <div class="demo">
      <mc-input v-model="amount"></mc-input>
      <mc-select v-model="currency" search>
        <template v-for="optionGroup in options" :key="optionGroup.value">
          <mc-select-group :label="optionGroup.label">
            <template v-for="option in optionGroup.stus" :key="option.value">
              <mc-select-option :value="option.value" :label="option.label">
                {{ option.label }}
              </mc-select-option>
            </template>
          </mc-select-group>
        </template>
      </mc-select>
    </div>
    <mc-input-group>
      <mc-input v-model="amount"></mc-input>
      <mc-select v-model="currency" search>
        <template v-for="optionGroup in options" :key="optionGroup.value">
          <mc-select-group :label="optionGroup.label">
            <template v-for="option in optionGroup.stus" :key="option.value">
              <mc-select-option :value="option.value" :label="option.label">
                {{ option.label }}
              </mc-select-option>
            </template>
          </mc-select-group>
        </template>
      </mc-select>
    </mc-input-group>
  </div>
</template>

<script setup lang="ts">
import McInputGroup from "../../../components/mc-input-group/mc-input-group.vue";
import McInput from "../../../components/mc-input/mc-input.vue";
import McSelect from "../../../components/mc-select/mc-select.vue";
import McSelectGroup from "../../../components/mc-select/mc-select-group.vue";
import McSelectOption from "../../../components/mc-select/mc-select-option.vue";
import { ref } from "vue";

const amount = ref<string>("");
const currency = ref<string>();

const options = ref([
  {
    label: "Crypto",
    value: "crypto",
    stus: [
      { label: "USDT", value: "USDT" },
      { label: "BTC", value: "BTC" },
      { label: "ETH", value: "ETH" },
      { label: "USDC", value: "USDC" },
    ],
  },
  {
    label: "Fiat",
    value: "fiat",
    stus: [
      { label: "USD", value: "USD" },
      { label: "EUR", value: "EUR" },
    ],
  },
]);
</script>

<style scoped lang="scss">
.demo {
  display: flex;
  align-items: center;
  margin-bottom: 600px;
}
</style>
