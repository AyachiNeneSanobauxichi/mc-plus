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
          <!-- input -->
          <mc-form-item prop="input" label="Amount" help="Please Input Amount">
            <template #tool>{{ "Clear" }}</template>
            <mc-input v-model="formState.input" />
          </mc-form-item>
          <!-- select -->
          <!-- <mc-form-item
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
          </mc-form-item> -->
          <!-- checkbox -->
          <!-- <mc-form-item prop="confirm" label="Check">
            <mc-checkbox v-model="formState.confirm" label="Confirm" />
          </mc-form-item> -->
          <!-- radio -->
          <!-- <mc-form-item prop="gender" label="Gender">
            <mc-radio-group v-model="formState.gender">
              <div class="radio-content">
                <mc-radio :value="0" label="Male" />
                <mc-radio :value="1" label="Female" />
              </div>
            </mc-radio-group>
          </mc-form-item> -->
          <!-- switch -->
          <mc-form-item prop="switch" label="Open">
            <mc-switch
              v-model="formState.switch"
              active-text="On"
              inactive-text="Off"
            />
          </mc-form-item>
        </mc-form>
      </div>
      <div class="tool-bar">
        <div>
          <span> Form State: {{ formState }} </span>
          <div>
            <span>Text Field: </span>
            <mc-input v-model="itemName" />
          </div>
        </div>
        <div class="btn-group">
          <mc-button @click="handleSubmit">Validate</mc-button>
          <mc-button @click="handleValidateAmount">Validate Item</mc-button>
          <mc-button @click="handleClear">Clear</mc-button>
          <mc-button @click="handleClearAmount">Clear Item</mc-button>
          <mc-button @click="handleChangeValue">Change Value</mc-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "mc-plus";
import { computed, reactive, ref } from "vue";
import { McButton } from "mc-plus";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import McInput from "../../../../components/mc-input/mc-input.vue";
// import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
// import McSelectGroupPlus from "../../../../components/mc-select-plus/mc-select-group-plus.vue";
// import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";
// import McCheckbox from "../../../../components/mc-checkbox/mc-checkbox.vue";
// import McRadio from "../../../../components/mc-radio/mc-radio.vue";
// import McRadioGroup from "../../../../components/mc-radio/mc-radio-group.vue";
import McSwitch from "../../../../components/mc-switch/mc-switch.vue";

type FormState = {
  input: string;
  select: string;
  checkbox: boolean;
  radio: number;
  switch: boolean;
};
const formState = reactive<FormState>({
  input: "",
  select: "",
  checkbox: false,
  radio: 1,
  switch: false,
});

const FormRef = ref<FormInstance>();

const itemName = ref<string>();

const textItemName = computed(() => {
  return itemName.value ? [itemName.value] : [];
});

const rules = reactive<FormRules>({
  input: [{ required: true, message: "Please input amount", trigger: "input" }],
  select: [{ required: true, message: "Please select currency" }],
  checkbox: [
    { required: true, message: "Do not confirm", type: "enum", enum: [false] },
  ],
  radio: [
    {
      required: true,
      message: "You can only select female",
      type: "enum",
      enum: [1],
    },
  ],
  switch: [
    {
      required: true,
      message: "You can`t open switch",
      type: "enum",
      enum: [false],
      trigger: ["input"],
    },
  ],
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
    FormRef.value?.validate(textItemName.value);
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
  FormRef.value?.clearValidate(textItemName.value);
};

const handleChangeValue = () => {
  formState.input = "1000";
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

  .radio-content {
    display: flex;
    align-items: center;
    gap: 32px;
  }
}

.tool-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 16px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .btn-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
