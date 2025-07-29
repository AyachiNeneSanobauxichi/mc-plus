<template>
  <div class="playground-lightbox">
    <mc-lightbox
      v-model="visible"
      title="Mc Lightbox"
      size="large"
      @close="handleClose"
    >
      <div class="lightbox-content">
        <mc-form :model="form">
          <mc-form-item label="Currency" prop="currency">
            <mc-select-plus
              v-model="form.currency"
              placeholder="Please select currency"
              search
              clearable
            >
              <template v-for="item in currencyList" :key="item.value">
                <mc-select-group-plus :label="item.label">
                  <mc-select-option-plus
                    v-for="child in item.children"
                    :key="child.value"
                    :label="child.label"
                    :value="child.value"
                  >
                  </mc-select-option-plus>
                </mc-select-group-plus>
              </template>
              <template #selected-content="{ selectedOption }">
                <div class="selected-content-wrapper">
                  <mc-tooltip content="Hiraswa Yui" trigger="click">
                    <div class="selected-content">{{ selectedOption }}</div>
                  </mc-tooltip>
                </div>
              </template>
            </mc-select-plus>
          </mc-form-item>
        </mc-form>
      </div>
      <template v-if="showExtraContent">
        <div class="lightbox-extra-content"></div>
      </template>
    </mc-lightbox>
    <div class="tool-bar">
      <mc-button @click="handleChangeVisible">Change Visible</mc-button>
      <mc-button @click="handleAddContent">Add/Remove Content</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import McLightbox from "../../../../components/mc-lightbox/mc-lightbox.vue";
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
import McSelectGroupPlus from "../../../../components/mc-select-plus/mc-select-group-plus.vue";
import McSelectOptionPlus from "../../../../components/mc-select-plus/mc-select-option-plus.vue";
import McForm from "../../../../components/mc-form/mc-form.vue";
import McFormItem from "../../../../components/mc-form/mc-form-item.vue";
import { McButton } from "mc-plus";
import McTooltip from "../../../../components/mc-tooltip/mc-tooltip.vue";

const visible = ref<boolean>(false);

const currencyList = reactive([
  {
    label: "Fiat",
    value: "fiat",
    children: [
      { label: "USD", value: "USD", desc: "United States Dollar" },
      { label: "EUR", value: "EUR", desc: "Euro" },
      { label: "GBP", value: "GBP", desc: "British Pound" },
      { label: "JPY", value: "JPY", desc: "Japanese Yen" },
      { label: "KRW", value: "KRW", desc: "South Korean Won" },
      { label: "CNY", value: "CNY", desc: "Chinese Yuan" },
      { label: "HKD", value: "HKD", desc: "Hong Kong Dollar" },
      { label: "AUD", value: "AUD", desc: "Australian Dollar" },
      { label: "CAD", value: "CAD", desc: "Canadian Dollar" },
      { label: "CHF", value: "CHF", desc: "Swiss Franc" },
    ],
  },
  {
    label: "Crypto",
    value: "crypto",
    children: [
      { label: "BTC", value: "BTC", desc: "Bitcoin" },
      { label: "ETH", value: "ETH", desc: "Ethereum" },
      { label: "SOL", value: "SOL", desc: "Solana" },
      { label: "XRP", value: "XRP", desc: "Ripple" },
      { label: "ADA", value: "ADA", desc: "Cardano" },
    ],
  },
]);

const form = reactive({
  currency: "",
});

const showExtraContent = ref<boolean>(true);

const handleChangeVisible = () => {
  visible.value = !visible.value;
};

const handleAddContent = () => {
  showExtraContent.value = !showExtraContent.value;
};

const handleClose = () => {
  console.log("close");
};
</script>

<style scoped lang="scss">
.playground-lightbox {
  .tool-bar {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    z-index: 999999;
  }
}
.lightbox-content {
  width: 100%;
  background-color: pink;
}

.lightbox-extra-content {
  width: 100%;
  height: 1000px;
  background-color: lightblue;
}

.selected-content-wrapper {
  width: 100%;
  height: 100%;

  :deep(.mc-popper) {
    width: 100%;
    .mc-popper-trigger {
      width: 100% !important;
    }

    .mc-popper-popper {
      width: fit-content !important;
    }
  }
  .selected-content {
    width: 200px;
    height: 100%;
    background-color: pink;
    color: white;
  }
}
</style>
