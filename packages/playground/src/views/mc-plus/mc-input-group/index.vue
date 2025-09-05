<template>
  <div class="playground-input-group">
    <div class="tool-bar">
      <mc-button @click="handleDisabled">Disabled</mc-button>
      <mc-button @click="handleValidate">Validate</mc-button>
      <mc-button @click="handleClearValidate">Clear Validate</mc-button>
    </div>
    <mc-form :model="formState" :rules="formRules" ref="formRef">
      <mc-form-item label="Amount" prop="amount" :disabled="disabled">
        <mc-input-group :prefix-flex="4" :suffix-flex="1">
          <template #prefix>
            <mc-input
              width="100%"
              height="100%"
              type="currency"
              v-model="formState.amount"
              placeholder="Please enter amount"
              input-group-position="prefix"
            />
          </template>
          <template #suffix>
            <mc-select-plus
              width="100%"
              height="100%"
              v-model="formState.currency"
              placeholder="Select currency"
              search
              clearable
              placement="bottom-end"
              input-group-position="suffix"
              disable-validation
            >
              <template #selected-content="{ selectedOption }">
                <mc-currency-icon
                  :currency="`${selectedOption}`"
                  width="100%"
                  height="100%"
                />
              </template>
              <template v-for="item in currencyList" :key="item.value">
                <mc-select-group-plus :label="item.label">
                  <mc-select-option-plus
                    v-for="child in item.children"
                    :key="child.value"
                    :label="child.label"
                    :value="child.value"
                  >
                    <mc-currency-icon
                      :currency="child.value"
                      :desc="child.desc"
                      width="100%"
                      height="100%"
                    />
                  </mc-select-option-plus>
                </mc-select-group-plus>
              </template>
            </mc-select-plus>
          </template>
        </mc-input-group>
      </mc-form-item>
      <mc-form-item
        label="Phone Number"
        prop="phoneNumber"
        :disabled="disabled"
      >
        <mc-input-group :prefix-flex="1" :suffix-flex="4">
          <template #prefix>
            <mc-select-plus
              width="100%"
              height="100%"
              v-model="formState.areaNumber"
              placeholder="Area number"
              input-group-position="prefix"
              disable-validation
            >
              <template #selected-content="{ selectedOption }">
                {{ `+${selectedOption}` }}
              </template>
              <template v-for="item in areaNumberList" :key="item.value">
                <mc-select-option-plus :label="item.label" :value="item.value">
                  <div class="area-number-option-content">
                    <span class="area-number-option-content-label">
                      {{ item.label }}
                    </span>
                    <span class="area-number-option-content-desc">
                      {{ item.desc }}
                    </span>
                  </div>
                </mc-select-option-plus>
              </template>
            </mc-select-plus>
          </template>
          <template #suffix>
            <mc-input
              width="100%"
              height="100%"
              type="number"
              v-model="formState.phoneNumber"
              placeholder="Please enter phone number"
              input-group-position="suffix"
            />
          </template>
        </mc-input-group>
      </mc-form-item>
    </mc-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "mc-plus";
import { reactive, ref } from "vue";
import {
  McButton,
  McForm,
  McFormItem,
  McInput,
  McInputGroup,
  McCurrencyIcon,
  McSelectPlus,
  McSelectGroupPlus,
  McSelectOptionPlus,
} from "mc-plus";

const formState = reactive({
  amount: "",
  currency: "",
  areaNumber: "",
  phoneNumber: "",
});

const formRules = reactive({
  amount: [{ required: true, message: "Please enter amount" }],
  phoneNumber: [{ required: true, message: "Please enter phone number" }],
});

const formRef = ref<FormInstance>();

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

const areaNumberList = reactive([
  { label: "+86", value: "86", desc: "China" },
  { label: "+852", value: "852", desc: "Hong Kong" },
  { label: "+853", value: "853", desc: "Macau" },
  { label: "+886", value: "886", desc: "Taiwan" },
]);

const disabled = ref(false);

const handleDisabled = () => {
  disabled.value = !disabled.value;
};

const handleValidate = () => {
  formRef.value?.validate();
};

const handleClearValidate = () => {
  formRef.value?.clearValidate();
};
</script>

<style scoped lang="scss">
.playground-input-group {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .tool-bar {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .area-number-option-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .area-number-option-content-label {
      font-size: 16px;
    }

    .area-number-option-content-desc {
      font-size: 12px;
      color: #808080;
    }
  }
}
</style>
