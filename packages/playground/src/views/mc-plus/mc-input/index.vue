<template>
  <div class="playground-input">
    <div class="tool-bar">
      <span>FormState: {{ formState }}</span>
      <div class="btn-group">
        <mc-button @click="handleDisabled">Disabled</mc-button>
        <mc-button @click="handleValidate">Validate</mc-button>
        <mc-button @click="handleClearValidate">Clear Validate</mc-button>
      </div>
    </div>
    <mc-form :model="formState" :rules="rules" ref="formRef">
      <mc-form-item label="User Name" prop="userName">
        <mc-input
          v-model="formState.userName"
          :maxlength="10"
          prefix-icon="Search"
          :disabled="disabled"
        />
      </mc-form-item>
    </mc-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "mc-plus";
import { reactive, ref } from "vue";
import { McButton, McForm, McFormItem, McInput } from "mc-plus";

const formState = reactive({
  userName: "",
});

const rules = {
  userName: [{ required: true, message: "Please enter user name" }],
};

const formRef = ref<FormInstance>();

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
.playground-input {
  width: 100%;
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tool-bar {
    margin-bottom: 32px;
    .btn-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
}
</style>
