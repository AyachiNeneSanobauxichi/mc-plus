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
    <mc-form :model="formState" :rules="rules">
      <mc-form-item label="Amount" prop="amount" required>
        <mc-input-group>
          <mc-input v-model="formState.amount"></mc-input>
          <mc-select v-model="formState.currency" search>
            <template v-for="optionGroup in options" :key="optionGroup.value">
              <mc-select-group :label="optionGroup.label">
                <template
                  v-for="option in optionGroup.stus"
                  :key="option.value"
                >
                  <mc-select-option :value="option.value" :label="option.label">
                    {{ option.label }}
                  </mc-select-option>
                </template>
              </mc-select-group>
            </template>
          </mc-select>
        </mc-input-group>
      </mc-form-item>
    </mc-form>
  </div>
</template>

<script setup lang="ts">
import McInputGroup from "../../../components/mc-input-group/mc-input-group.vue";
import McInput from "../../../components/mc-input/mc-input.vue";
import McSelect from "../../../components/mc-select/mc-select.vue";
import McSelectGroup from "../../../components/mc-select/mc-select-group.vue";
import McSelectOption from "../../../components/mc-select/mc-select-option.vue";
import McForm from "../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../components/mc-form/mc-form-item.vue";
import { type FormRules } from "mc-plus";
import { reactive, ref } from "vue";

const amount = ref<string>("");
const currency = ref<string>();

type FormState = { amount: string; currency: string };
const formState = reactive<FormState>({
  amount: "yui",
  currency: "ui",
});

const rules = reactive<FormRules<FormState>>({
  currency: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (value === "USDT") {
          callback(new Error("Please select a correct currency"));
        } else {
          callback();
        }
      },
    },
  ],
  amount: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (Number(value) > 3000) {
          callback(new Error("Amount must be less than 3000"));
        } else {
          callback();
        }
      },
    },
  ],
});

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
