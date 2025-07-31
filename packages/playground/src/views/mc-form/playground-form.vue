<template>
  <div class="playground-form">
    <div>
      <div class="form-container">
        <mc-form
          :model="formState"
          ref="FormRef"
          :rules="rules"
          scroll-to-error
        >
          <mc-form-item prop="amount" label="Amount" help="Please Input Amount">
            <template #tool>{{ "Clear" }}</template>
            <mc-input v-model="formState.amount" />
          </mc-form-item>
          <mc-form-item
            prop="currency"
            label="Currency"
            desc="Please input currency"
          >
            <mc-select-plus
              v-model="formState.currency"
              placeholder="Please select currency"
              search
              clearable
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
          </mc-form-item>
        </mc-form>
      </div>
      <div class="tool-bar">
        <mc-button @click="handleSubmit">Validate</mc-button>
        <mc-button @click="handleValidateAmount">Validate Amount</mc-button>
        <mc-button @click="handleClear">Clear</mc-button>
        <mc-button @click="handleClearAmount">Clear Amount</mc-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "mc-plus";
import { reactive, ref } from "vue";
import { McButton } from "mc-plus";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import McInput from "../../../../components/mc-input/mc-input.vue";
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
import McSelectGroupPlus from "../../../../components/mc-select-plus/mc-select-group-plus.vue";
import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";

type FormState = {
  amount: string;
  currency: string;
  address: string;
};
const formState = reactive<FormState>({
  amount: "3000",
  currency: "USD",
  address: "US",
});

const FormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  amount: [{ required: true }],
  currency: [{ required: true }],
  address: [{ required: true }],
});

const handleSubmit = async () => {
  if (!FormRef.value) return;
  try {
    const result = await FormRef.value.validate();
    console.log("Validate succeed", result);
  } catch (error) {
    console.error("Validate failed: ", error);
  }
};

const handleValidateAmount = () => {
  try {
    FormRef.value?.validate(["amount"]);
  } catch (error) {
    console.log(error);
  }
};
const handleClear = () => {
  if (!FormRef.value) return;
  try {
    FormRef.value.clearValidate();
  } catch (error) {
    console.log(error);
  }
};

const handleClearAmount = () => {
  FormRef.value?.clearValidate(["amount"]);
};

const currencyList = reactive([
  {
    label: "Fiat",
    value: "fiat",
    children: [
      { label: "USD", value: "USD", desc: "United States Dollar" },
      { label: "EUR", value: "EUR", desc: "Euro" },
      { label: "GBP", value: "GBP", desc: "British Pound" },
      { label: "JPY", value: "JPY", desc: "Japanese Yen" },
      { label: "KRW", value: "KRW", desc: "South Korean Won" },
      { label: "CNY", value: "CNY", desc: "Chinese Yuan" },
      { label: "HKD", value: "HKD", desc: "Hong Kong Dollar" },
      { label: "AUD", value: "AUD", desc: "Australian Dollar" },
      { label: "CAD", value: "CAD", desc: "Canadian Dollar" },
      { label: "CHF", value: "CHF", desc: "Swiss Franc" },
    ],
  },
  {
    label: "Crypto",
    value: "crypto",
    children: [
      { label: "BTC", value: "BTC", desc: "Bitcoin" },
      { label: "ETH", value: "ETH", desc: "Ethereum" },
      { label: "SOL", value: "SOL", desc: "Solana" },
      { label: "XRP", value: "XRP", desc: "Ripple" },
      { label: "ADA", value: "ADA", desc: "Cardano" },
    ],
  },
]);
</script>

<style scoped lang="scss">
.playground-form {
  .form-container {
    width: 60%;
    height: 3500px;
    margin: 0 auto;
    margin-top: 320px;
  }
}

.tool-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  box-sizing: border-box;
  gap: 16px;
}
</style>
