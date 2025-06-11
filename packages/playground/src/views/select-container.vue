<template>
  <div class="select-container">
    <mc-select v-model="student">
      <template v-for="optionGroup in options" :key="optionGroup.value">
        <mc-select-group :value="optionGroup.value" :label="optionGroup.label">
          <template v-for="option in optionGroup.stus" :key="option.value">
            <mc-select-option :value="option.value">
              {{ option.label }}
            </mc-select-option>
          </template>
        </mc-select-group>
      </template>
    </mc-select>
  </div>
</template>

<script setup lang="ts">
import McSelect from "../../../components/mc-select-plus/mc-select.vue";
import McSelectGroup from "../../../components/mc-select-plus/mc-select-group.vue";
import McSelectOption from "../../../components/mc-select-plus/mc-select-option.vue";
import { ref } from "vue";

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

const student = ref<string>("mio");
</script>

<style scoped lang="scss"></style>
