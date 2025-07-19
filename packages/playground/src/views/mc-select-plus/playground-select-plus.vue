<template>
  <div class="playground-select-plus">
    <div class="tool-bar">
      <span>FormState: {{ formState }}</span>
      <div class="btn-group">
        <mc-button @click="handleDisabled">Disabled</mc-button>
        <mc-button @click="handleValidate">Validate</mc-button>
        <mc-button @click="handleClearValidate">Clear Validate</mc-button>
      </div>
    </div>
    <mc-form :model="formState" :rules="formRules" ref="formRef">
      <mc-form-item label="currency" prop="currency" :disabled="isDisabled">
        <mc-select-plus
          v-model="formState.currency"
          placeholder="Please select currency"
          width="400px"
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
</template>

<script setup lang="ts">
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
import McSelectGroupPlus from "../../../../components/mc-select-plus/mc-select-group-plus.vue";
import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import { reactive, ref } from "vue";
import { McButton, type FormInstance } from "mc-plus";

const formState = reactive({
  currency: "USD",
});

const formRules = reactive({
  currency: [{ required: true, message: "Please select currency" }],
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

const isDisabled = ref<boolean>(false);

const handleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};

const handleValidate = () => {
  formRef.value?.validate();
};

const handleClearValidate = () => {
  formRef.value?.clearValidate();
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

    .btn-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
