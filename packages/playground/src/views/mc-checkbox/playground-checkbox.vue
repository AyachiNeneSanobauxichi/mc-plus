<template>
  <div class="playground-checkbox">
    <div class="display">Form State: {{ formState }}</div>
    <div>
      <mc-form :model="formState" :rules="rules" direction="horizontal">
        <mc-form-item label="Students" prop="students">
          <mc-checkbox-group v-model="formState.students" :disabled="disabled">
            <mc-checkbox
              content="Hirasawa Yui"
              remarks="k-on"
              :value="1"
            ></mc-checkbox>
            <mc-checkbox
              content="Nakano Azusa"
              remarks="k-on"
              :value="2"
            ></mc-checkbox>
            <mc-checkbox
              content="Akiyama Mio"
              remarks="k-on"
              :value="3"
            ></mc-checkbox>
            <mc-checkbox
              content="Tainaka Ritsu"
              remarks="k-on"
              :value="4"
            ></mc-checkbox>
            <mc-checkbox
              content="Kotobuku Tsumugi"
              remarks="k-on"
              :value="5"
            ></mc-checkbox>
          </mc-checkbox-group>
        </mc-form-item>
        <mc-form-item label="Check" prop="check">
          <mc-checkbox
            v-model="formState.check"
            content="Mc Checkbox"
            :disabled="disabled"
            :partial="partial"
          ></mc-checkbox>
        </mc-form-item>
      </mc-form>
    </div>
    <div class="single-checkbox"></div>
    <div class="tool-bar">
      <mc-button @click="handleDisable">Disable</mc-button>
      <mc-button @click="handlePartial">Partial</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { McButton, type FormRules } from "mc-plus";
import McCheckboxGroup from "../../../../components/mc-checkbox/mc-checkbox-group.vue";
import McCheckbox from "../../../../components/mc-checkbox/mc-checkbox.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";

type FormState = {
  students: number[];
  check: boolean;
};

const formState = reactive<FormState>({
  students: [2, 3],
  check: false,
});

const rules: FormRules<FormState> = {
  students: [
    {
      required: true,
      message: "Please select at least one student",
    },
  ],
  check: [
    { required: true, message: "Please check", type: "enum", enum: [true] },
  ],
};

const disabled = ref<boolean>(false);

const handleDisable = () => {
  disabled.value = !disabled.value;
};

const partial = ref<boolean>(false);

const handlePartial = () => {
  partial.value = !partial.value;
};
</script>

<style scoped lang="scss">
.playground-checkbox {
  width: 1200px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .single-checkbox {
    margin-top: 16px;
  }

  .tool-bar {
    display: flex;
    gap: 16px;
    position: absolute;
    bottom: 32px;
  }
}
</style>
