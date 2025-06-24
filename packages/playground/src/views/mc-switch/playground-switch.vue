<template>
  <div class="playground-switch">
    <mc-form :model="formState" :rules="formRules">
      <mc-form-item label="Check" prop="check">
        <mc-switch
          v-model="formState.check"
          active-text="Show"
          inactive-text="Hide"
          size="large"
          label="Akiyama Mio is a good girl"
          help-text="Akiyama Mio is a good girl"
          label-position="right"
        >
        </mc-switch>
      </mc-form-item>
    </mc-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from "mc-plus";
import { ref } from "vue";
import McSwitch from "../../../../components/mc-switch-v2/mc-switch.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";

const formState = ref<{
  check: boolean;
}>({
  check: false,
});

const formRules = ref<FormRules>({
  check: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("Please check"));
        }
      },
    },
  ],
});
</script>

<style scoped lang="scss"></style>
