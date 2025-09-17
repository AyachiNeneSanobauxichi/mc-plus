<template>
  <div class="playground-input">
    <section class="tool-bar">
      <span>FormState: {{ formState }}</span>
      <div class="btn-group">
        <mc-button @click="handleDisabled">Disabled</mc-button>
        <mc-button @click="handleValidate">Validate</mc-button>
        <mc-button @click="handleClearValidate">Clear Validate</mc-button>
      </div>
    </section>
    <section class="input-container">
      <mc-form :model="formState" :rules="rules" ref="formRef">
        <mc-form-item label="User Name" prop="userName">
          <mc-input
            v-model="formState.userName"
            width="100%"
            :disabled="disabled"
            prefix-icon="Search"
            :maxlength="10"
          >
          </mc-input>
        </mc-form-item>
        <div class="markup-container">
          <mc-form-item label="Bid Markup" prop="bid">
            <mc-input
              v-model="formState.bid"
              width="100%"
              :disabled="disabled"
              type="number"
              :maxlength="10"
              :placeholder="``"
              text-align="right"
              hide-validation-icon
            >
              <template #append>
                <span>bps</span>
              </template>
            </mc-input>
          </mc-form-item>
          <mc-form-item label="Ask Markup" prop="ask">
            <mc-input
              v-model="formState.ask"
              width="100%"
              :disabled="disabled"
              type="number"
              :maxlength="10"
              :placeholder="``"
              text-align="right"
              hide-validation-icon
            >
              <template #append>
                <span>bps</span>
              </template>
            </mc-input>
          </mc-form-item>
        </div>
      </mc-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "mc-plus";
import { reactive, ref } from "vue";
import { McButton, McForm, McFormItem, McInput } from "mc-plus";

const formState = reactive({
  userName: "",
  bid: "",
  ask: "",
});

const rules = {
  userName: [{ required: true, message: "Please enter user name" }],
  bid: [{ required: true, message: "Please enter bid markup" }],
  ask: [{ required: true, message: "Please enter ask markup" }],
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
@use "@mc-plus/theme/mixins.scss" as mixin;

.playground-input {
  @include mixin.flex-center(column, flex-start, flex-start, 40px);

  .tool-bar {
    @include mixin.flex-center(column, flex-start, flex-start, 16px);
    .btn-group {
      @include mixin.flex-center(row, flex-start, flex-start, 8px);
    }
  }

  .input-container {
    width: 400px;

    .markup-container {
      @include mixin.flex-center(row, flex-start, flex-start, 24px);
    }
  }
}
</style>
