<template>
  <div class="input-group-container">
    <mc-input-group>
      <mc-input v-model="schoolName"></mc-input>
      <mc-select v-model="student" search>
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
    </mc-input-group>
  </div>
</template>

<script setup lang="ts">
import McInputGroup from "../../../components/mc-input-group/mc-input-group.vue";
import McInput from "../../../components/mc-input/mc-input.vue";
import McSelect from "../../../components/mc-select/mc-select.vue";
import McSelectGroup from "../../../components/mc-select/mc-select-group.vue";
import McSelectOption from "../../../components/mc-select/mc-select-option.vue";
import { ref } from "vue";

const schoolName = ref<string>("");
const student = ref<string>();

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
</script>

<style scoped lang="scss"></style>
