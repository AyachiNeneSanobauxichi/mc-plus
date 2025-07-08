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
        <mc-form-item label="userName" prop="userName" :disabled="isDisabled">
          <mc-input v-model="form.userName" />
        </mc-form-item>
        <mc-form-item label="checkbox" prop="checkbox" :disabled="isDisabled">
          <mc-checkbox v-model="form.checkbox" />
        </mc-form-item>
      </mc-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "mc-plus";
import { McButton } from "mc-plus";
import { ref } from "vue";
import McOtp from "../../../../components/mc-otp/mc-otp.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import McInput from "../../../../components/mc-input/mc-input.vue";
import McCheckbox from "../../../../components/mc-checkbox/mc-checkbox.vue";

type FormState = {
  otp: string;
  userName: string;
  checkbox: boolean;
};

const form = ref<FormState>({
  otp: "123456",
  userName: "Hirasawa Yui",
  checkbox: false,
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
    },
  ],
  userName: [{ required: true, message: "Please input user name" }],
};

const handleValidate = () => {
  formRef.value?.validate();
};

const handleClear = () => {
  formRef.value?.clearValidate();
};

const isDisabled = ref(true);

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
