<template>
  <div class="playground-input-group">
    <div class="tool-bar">
      <mc-button @click="handleDisabled">Disabled</mc-button>
      <mc-button @click="handleValidate">Validate</mc-button>
      <mc-button @click="handleClearValidate">Clear Validate</mc-button>
    </div>
    <mc-form :model="formState" :rules="formRules" ref="formRef">
      <mc-form-item label="Amount" prop="amount" :disabled="disabled">
        <mc-input-group :prefix-flex="3" :suffix-flex="1">
          <template #prefix>
            <mc-input
              width="100%"
              height="100%"
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
      </mc-form-item>
    </mc-form>
  </div>
</template>

<script setup lang="ts">
import McInputGroup from "../../../../components/mc-input-group/mc-input-group.vue";
import McInput from "../../../../components/mc-input/mc-input.vue";
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
import McSelectGroupPlus from "../../../../components/mc-select-plus/mc-select-group-plus.vue";
import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import { reactive, ref } from "vue";
import type { FormInstance } from "mc-plus";
import { McButton } from "mc-plus";

const formState = reactive({
  amount: "",
  currency: "",
});

const formRules = reactive({
  amount: [{ required: true, message: "Please enter amount" }],
});

const formRef = ref<FormInstance>();

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
}
</style>
