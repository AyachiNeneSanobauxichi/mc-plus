<template>
  <div class="playground-otp playground-center">
    <div class="display">
      <p>formState: {{ form }}</p>
      <div class="button-group">
        <mc-button @click="handleValidate">Validate</mc-button>
        <mc-button @click="handleClear">Clear</mc-button>
      </div>
    </div>
    <div class="form-container">
      <mc-form :model="form" :rules="rules" ref="formRef">
        <mc-form-item label="otp" prop="otp">
          <mc-otp v-model="form.otp" :length="6" />
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

type FormState = {
  otp: string;
  userName: string;
};

const form = ref<FormState>({
  otp: "",
  userName: "",
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
