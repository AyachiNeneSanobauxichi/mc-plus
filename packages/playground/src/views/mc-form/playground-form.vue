<template>
  <div class="playground-form">
    <div>
      <div class="form-container">
        <mc-form :model="formState" ref="FormRef" :rules="rules">
          <mc-form-item prop="amount" label="Amount" help="Please Input Amount">
            <template #tool>{{ "Clear" }}</template>
            <mc-input v-model="formState.amount" />
          </mc-form-item>
          <mc-form-item
            prop="currency"
            label="Currency"
            desc="Please input currency"
          >
            <mc-input v-model="formState.currency" />
          </mc-form-item>
          <mc-form-item prop="address.street" label="Street">
            <mc-input v-model="formState.address.street" />
          </mc-form-item>
        </mc-form>
      </div>
      <div class="tool-bar">
        <mc-button @click="handleSubmit">Validate</mc-button>
        <mc-button @click="handleClear">Clear</mc-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import { reactive, ref } from "vue";
import McInput from "../../../../components/mc-input/mc-input.vue";
import { McButton, type FormRules } from "mc-plus";

type FormState = {
  amount: string;
  currency: string;
  address: { street: string };
};
const formState = reactive<FormState>({
  amount: "3000",
  currency: "USD",
  address: {
    street: "kamedo tenjin",
  },
});

const FormRef = ref<typeof McForm>();

const rules = reactive<FormRules>({
  amount: [{ required: true }],
  currency: [{ required: true }],
  "address.street": [{ required: true }],
});

const handleSubmit = async () => {
  if (!FormRef.value) return;
  try {
    await FormRef.value.validate();
    console.log("Validate succeed");
  } catch (error) {
    console.error("Validate failed: ", error);
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
</script>

<style scoped lang="scss">
.playground-form {
  .form-container {
    width: 500px;
  }
}

.tool-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
