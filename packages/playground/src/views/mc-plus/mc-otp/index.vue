<template>
  <div class="playground-otp playground-center">
    <div class="display">
      <p>formState: {{ form }}</p>
      <div class="button-group">
        <mc-button @click="handleValidate">Validate</mc-button>
        <mc-button @click="handleClear">Clear</mc-button>
        <mc-button @click="handleDisable">Disable</mc-button>
      </div>
    </div>
    <div class="form-container">
      <mc-form :model="form" :rules="rules" ref="formRef">
        <mc-form-item label="otp" prop="otp" :disabled="isDisabled">
          <mc-otp v-model="form.otp" :length="6" />
        </mc-form-item>
      </mc-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "mc-plus";
import { ref } from "vue";
import { McButton, McForm, McFormItem, McOtp } from "mc-plus";

type FormState = {
  otp: string;
};

const form = ref<FormState>({
  otp: "123456",
});

const formRef = ref<FormInstance>();

const rules: FormRules<FormState> = {
  otp: [
    {
      required: true,
      message: "Please input otp",
      validator: (_, value, callback) => {
        if (value.length !== 6) {
          callback(new Error("Please input 6 digits otp"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

const handleValidate = () => {
  formRef.value?.validate();
};

const handleClear = () => {
  formRef.value?.clearValidate();
};

const isDisabled = ref(false);

const handleDisable = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style scoped lang="scss">
.button-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-container {
  margin-top: 24px;
}
</style>
