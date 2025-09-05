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
            :disabled="disabled"
            prefix-icon="Search"
            type="number"
            :maxlength="10"
          >
            <template #suffix>
              <div class="input-suffix">bps</div>
            </template>
          </mc-input>
        </mc-form-item>
      </mc-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "mc-plus";
import { reactive, ref } from "vue";
import { McButton, McForm, McFormItem } from "mc-plus";
import McInput from "../../../../../components/mc-input/mc-input.vue";

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
  }
}
</style>
