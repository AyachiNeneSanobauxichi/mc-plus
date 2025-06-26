<template>
  <div class="playground-select">
    <div>Students: {{ formState.students }}</div>
    <div>Teacher: {{ formState.teacher }}</div>
    <mc-form :model="formState" :rules="rules">
      <mc-form-item label="Student" prop="students" class="form-item">
        <mc-select
          class="student-select"
          v-model="formState.students"
          search
          multiple
          placeholder="Please select a student"
        >
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
      <mc-form-item label="Teacher" prop="teacher" class="form-item">
        <mc-select
          class="student-select"
          v-model="formState.teacher"
          search
          placeholder="Please select a teacher"
        >
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
import McSelect from "../../../../components/mc-select/mc-select.vue";
import McSelectGroup from "../../../../components/mc-select/mc-select-group.vue";
import McSelectOption from "../../../../components/mc-select/mc-select-option.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import { reactive, ref } from "vue";
import { type FormRules } from "mc-plus";

const options = ref([
  {
    label: "3 年",
    value: "grade3",
    stus: [
      { label: "Hirasawa Yui", value: 1 },
      { label: "Akiyama Mio", value: 2 },
      { label: "Tainaka Ritsu", value: 3 },
      { label: "Kotobuku Tsumugi", value: 4 },
    ],
  },
  {
    label: "2 年",
    value: "grade3",
    stus: [
      { label: "Nakano Azusa", value: 5 },
      { label: "Hirasawa Ui", value: 6 },
      { label: "Ayachi Nene", value: 7 },
    ],
  },
]);

type FormState = { students?: number[]; teacher?: number };
const formState = reactive<FormState>({
  students: [5],
});

const rules = reactive<FormRules<FormState>>({
  students: [
    {
      required: true,
      message: "Please select a student",
    },
  ],
});
</script>

<style scoped lang="scss">
.playground-select {
  .form-item {
    width: 600px;
    .student-select {
      width: 100%;
    }
  }
}
</style>
