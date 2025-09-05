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
          <!-- input group -->
          <mc-form-item prop="inputGroup" label="Amount">
            <mc-input-group :prefix-flex="4" :suffix-flex="1">
              <template #prefix>
                <mc-input
                  width="100%"
                  height="100%"
                  type="currency"
                  v-model="formState.inputGroup"
                  placeholder="Please enter amount"
                  input-group-position="prefix"
                />
              </template>
              <template #suffix>
                <mc-select-plus
                  width="100%"
                  height="100%"
                  v-model="formState.inputGroupCurrency"
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
          <!-- textarea -->
          <mc-form-item prop="textarea" label="Description">
            <mc-textarea v-model="formState.textarea" />
          </mc-form-item>
          <!-- otp -->
          <mc-form-item prop="otp" label="Verify Code">
            <mc-otp v-model="formState.otp" />
          </mc-form-item>
          <!-- select -->
          <mc-form-item
            prop="select"
            label="Currency"
            desc="Please input currency"
          >
            <mc-select-plus
              v-model="formState.select"
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
          <!-- multi select -->
          <mc-form-item
            prop="multiSelect"
            label="Currency"
            desc="Please select currency"
          >
            <mc-select-plus
              v-model="formState.multiSelect"
              placeholder="Please select currency"
              search
              clearable
              multiple
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
          <!-- checkbox -->
          <mc-form-item prop="checkbox" label="Check">
            <mc-checkbox
              v-model="formState.checkbox"
              label="Confirm"
              content="Confirm"
              remarks="Please confirm"
            />
          </mc-form-item>
          <!-- checkbox group -->
          <mc-form-item prop="checkboxGroup" label="Currency">
            <mc-checkbox-group v-model="formState.checkboxGroup">
              <div class="checkbox-group-content">
                <mc-checkbox :value="1" label="BTC" />
                <mc-checkbox :value="2" label="ETH" />
                <mc-checkbox :value="3" label="JPY" />
              </div>
            </mc-checkbox-group>
          </mc-form-item>
          <!-- radio -->
          <mc-form-item prop="radio" label="Gender" :disabled="disable">
            <mc-radio-group v-model="formState.radio">
              <div class="radio-content">
                <mc-radio :value="0" label="Male" />
                <mc-radio :value="1" label="Female" />
              </div>
            </mc-radio-group>
          </mc-form-item>
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
          <span>Form State: {{ formState }} </span>
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
          <mc-button @click="handleDisable">Disable</mc-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "mc-plus";
import { computed, reactive, ref } from "vue";
import {
  McButton,
  McForm,
  McFormItem,
  McInput,
  McOtp,
  McSelectPlus,
  McSelectGroupPlus,
  McSelectOptionPlus,
  McCheckboxGroup,
  McCheckbox,
  McRadio,
  McRadioGroup,
  McSwitch,
  McInputGroup,
  McCurrencyIcon,
  McTextarea,
} from "mc-plus";

type FormState = {
  input: string;
  inputGroup: string;
  inputGroupCurrency: string;
  textarea: string;
  otp: string;
  select: string;
  multiSelect: string[];
  checkbox: boolean;
  checkboxGroup: number[];
  radio: number;
  switch: boolean;
};
const formState = reactive<FormState>({
  input: "1000",
  inputGroup: "1000",
  inputGroupCurrency: "USD",
  textarea: "",
  otp: "",
  select: "JPY",
  multiSelect: ["BTC", "ETH"],
  checkbox: false,
  checkboxGroup: [1, 2],
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
  inputGroup: [
    {
      required: true,
      message: "Please input amount",
      trigger: "input",
    },
  ],
  textarea: [
    {
      required: true,
      message: "Please input description",
      trigger: "input",
    },
  ],
  otp: [
    {
      required: true,
      message: "Please input otp",
      trigger: "blur",
      len: 6,
    },
  ],
  select: [
    { required: true, message: "Please select currency", trigger: "input" },
  ],
  multiSelect: [
    {
      required: true,
      message: "Please select currency",
      trigger: "input",
    },
  ],
  checkbox: [
    {
      required: true,
      message: "Do not confirm",
      type: "enum",
      enum: [false],
      trigger: "input",
    },
  ],
  checkboxGroup: [
    {
      required: true,
      message: "Please select currency",
      trigger: "input",
    },
  ],
  radio: [
    {
      required: true,
      message: "You can only select female",
      type: "enum",
      enum: [1],
      trigger: "input",
    },
  ],
  switch: [
    {
      required: true,
      message: "You can`t open switch",
      type: "enum",
      enum: [false],
      trigger: "input",
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
  formState.checkbox = !formState.checkbox;
};

const disable = ref<boolean>(false);

const handleDisable = () => {
  disable.value = !disable.value;
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

  .checkbox-group-content {
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
