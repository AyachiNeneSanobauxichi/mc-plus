<template>
  <div class="playground-textarea">
    <div class="tool-bar">
      <span>Text Area Value: {{ formData }}</span>
      <div>
        <mc-button @click="handleDisabled">Disabled</mc-button>
      </div>
    </div>
    <div>
      <mc-form :model="formData">
        <mc-form-item
          label="Text Area"
          prop="textareaValue"
          required
          :disabled="isDisabled"
        >
          <mc-textarea
            width="100%"
            height="80px"
            resize="none"
            v-model="formData.textareaValue"
          ></mc-textarea>
        </mc-form-item>
      </mc-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McTextarea from "../../../../components/mc-textarea/mc-textarea.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";

const formData = ref({
  textareaValue: "",
});

const isDisabled = ref(false);

const handleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style scoped lang="scss">
.playground-textarea {
  width: 80%;
  height: 800px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
