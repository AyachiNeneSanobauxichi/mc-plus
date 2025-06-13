<template>
  <div class="form-container">
    <div>
      <div>
        <mc-form :model="formState" ref="FormRef">
          <mc-form-item prop="amount" label="Amount" required>
            <mc-input v-model="formState.amount" />
          </mc-form-item>
          <mc-form-item
            prop="currency"
            label="Currency"
            :rules="[{ required: true, message: 'Please input currency' }]"
          >
            <mc-input v-model="formState.currency" />
          </mc-form-item>
        </mc-form>
      </div>
      <div class="button-group">
        <mc-button @click="handleSubmit">Validate</mc-button>
        <mc-button @click="handleClear">Clear</mc-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import McForm from "../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../components/mc-form/mc-form-item.vue";
import { reactive, ref } from "vue";
import McInput from "../../../components/mc-input/mc-input.vue";
import { McButton, type FormRules } from "mc-plus";

type FormState = { amount: string; currency: string };
const formState = reactive<FormState>({
  amount: "3000",
  currency: "USD",
});

const FormRef = ref<typeof McForm>();

const rules = reactive<FormRules<FormState>>({
  amount: [{ required: true }],
  currency: [{ required: true }],
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
.form-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .button-group {
    margin-top: 200px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
