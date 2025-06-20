<template>
  <div class="radio-container">
    <div class="display">
      <div>FormState: {{ formState }}</div>
      <div class="button-group">
        <mc-button @click="handleValidate">Validate</mc-button>
        <mc-button @click="handleClear">Clear</mc-button>
        <mc-button @click="handleChangeDisable">Disable</mc-button>
      </div>
    </div>
    <div>
      <mc-form :model="formState" ref="FormRef" :rules="rules">
        <mc-form-item label="Student" prop="stu" required>
          <mc-radio-group v-model="formState.stu" :disabled="disable">
            <div class="radio">
              <mc-radio
                :value="1"
                label="Hirasawa Yui"
                remark="HirasawaYuiHirasawaYuiHirasawaYuiHirasawaYuiHirasawaYui"
              ></mc-radio>
            </div>
            <div class="radio">
              <mc-radio :value="2" label="Nakano Azusa"></mc-radio>
            </div>
            <div class="radio">
              <mc-radio
                :value="3"
                label="Akiyama Mio"
                help="Akiyama Mio"
              ></mc-radio>
            </div>
            <div class="radio">
              <mc-radio :value="4" label="Tainaka Ritsu"></mc-radio>
            </div>
            <div class="radio">
              <mc-radio :value="5" label="Kotobuku Tsumugi" disabled></mc-radio>
            </div>
          </mc-radio-group>
        </mc-form-item>
      </mc-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import McRadioGroup from "../../../components/mc-radio/mc-radio-group.vue";
import McRadio from "../../../components/mc-radio/mc-radio.vue";
import McForm from "../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../components/mc-form/mc-form-item.vue";
import { McButton } from "mc-plus";
import type { FormRules } from "mc-plus";

type FormState = {
  stu: number | undefined;
};

const formState = reactive<FormState>({
  stu: undefined,
});

const rules: FormRules<FormState> = {
  stu: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (value === 3) {
          callback(new Error("You can`t select Mio"));
        } else {
          callback();
        }
      },
    },
  ],
};

const FormRef = ref<typeof McForm>();

const handleValidate = () => {
  FormRef.value!.validate();
};

const handleClear = () => {
  FormRef.value!.clearValidate();
};

const disable = ref<boolean>(false);
const handleChangeDisable = () => {
  disable.value = !disable.value;
};
</script>

<style scoped lang="scss">
.radio-container {
  width: 1200px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.display {
  width: 1200px;
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
}

.radio {
  width: 300px;
}

.button-group {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
