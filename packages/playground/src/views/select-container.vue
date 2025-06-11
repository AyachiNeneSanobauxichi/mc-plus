<template>
  <div class="select-container">
    <mc-form :model="formState" :rules="rules">
      <mc-form-item label="Student" prop="student" required>
        <mc-select v-model="formState.student" search>
          <template v-for="optionGroup in options" :key="optionGroup.value">
            <mc-select-group :label="optionGroup.label">
              <template v-for="option in optionGroup.stus" :key="option.value">
                <mc-select-option :value="option.value" :label="option.label">
                  {{ option.label }}
                </mc-select-option>
              </template>
            </mc-select-group>
          </template>
        </mc-select>
      </mc-form-item>
    </mc-form>
  </div>
</template>

<script setup lang="ts">
import McSelect from "../../../components/mc-select/mc-select.vue";
import McSelectGroup from "../../../components/mc-select/mc-select-group.vue";
import McSelectOption from "../../../components/mc-select/mc-select-option.vue";
import McForm from "../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../components/mc-form/mc-form-item.vue";
import { reactive, ref } from "vue";
import { type FormRules } from "mc-plus";

const options = ref([
  {
    label: "3 年",
    value: "grade3",
    stus: [
      { label: "Hirasawa Yui", value: "yui" },
      { label: "Akiyama Mio", value: "mio" },
      { label: "Tainaka Ritsu", value: "ritsu" },
      { label: "Kotobuku Tsumugi", value: "mugi" },
    ],
  },
  {
    label: "2 年",
    value: "grade3",
    stus: [
      { label: "Nakano Azusa", value: "azusa" },
      { label: "Hirasawa Ui", value: "ui" },
    ],
  },
]);

type FormState = { student: string };
const formState = reactive<FormState>({
  student: "mio",
});

const rules = reactive<FormRules<FormState>>({
  student: [
    {
      required: true,
      message: "Please select a student",
      validator: (_, value, callback) => {
        if (value === "yui") {
          callback(new Error("Please select a student"));
        } else {
          callback();
        }
      },
    },
  ],
});
</script>

<style scoped lang="scss"></style>
