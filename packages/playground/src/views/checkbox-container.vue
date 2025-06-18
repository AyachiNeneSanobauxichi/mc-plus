<template>
  <div class="checkbox-container">
    <div class="button-group">
      <mc-button @click="handleDisable">Disable</mc-button>
      <mc-button @click="handleValidate">Validate</mc-button>
      <mc-button @click="handleClear">Clear</mc-button>
    </div>
    <div>
      <mc-form :model="formState" :rules="rules" ref="FormRef">
        <mc-form-item label="Mio" prop="check">
          <mc-checkbox
            partial
            v-model="formState.check"
            content="Akiyama Mio"
            remarks="k-on"
            :disabled="disabled"
          ></mc-checkbox>
        </mc-form-item>
      </mc-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { McButton, type FormRules } from "mc-plus";
import McCheckbox from "../../../components/mc-checkbox/mc-checkbox.vue";
import McForm from "../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../components/mc-form/mc-form-item.vue";

type FormState = {
  check: boolean;
};

const formState = reactive<FormState>({
  check: false,
});

const rules: FormRules<FormState> = {
  check: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (value === false) {
          callback(new Error("You can`t select mio"));
        } else {
          callback();
        }
      },
    },
  ],
};

const disabled = ref<boolean>(false);

const handleDisable = () => {
  disabled.value = !disabled.value;
};

const FormRef = ref<typeof McForm>();

const handleValidate = () => {
  FormRef.value!.validate();
};

const handleClear = () => {
  FormRef.value!.clearValidate();
};
</script>

<style scoped lang="scss">
.checkbox-container {
  width: 1200px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-group {
  width: 1200px;
  position: fixed;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}
</style>
