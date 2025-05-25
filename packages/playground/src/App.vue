<template>
  <div class="container">
    <div class="show-value">
      <span>Select Value: {{ selectValue }}</span>
    </div>
    <div>
      <mc-select v-model="selectValue" width="100%" height="56px">
        <mc-select-group
          label="Cryptocurrencies"
          height="24px"
          :style="{ color: '#301A6D' }"
        >
          <mc-select-option value="BTC" label="BTC">
            <div class="currency-option">
              <img src="./imgs/BTC.svg" alt="BTC" />
              <div class="currency-option-content">
                <div class="currency-option-content-name">BTC</div>
                <div class="currency-option-content-desc">crypto btc</div>
              </div>
            </div>
          </mc-select-option>
          <mc-select-option value="ETH" label="ETH">
            <div class="currency-option">
              <img src="./imgs/ETH.svg" alt="ETH" />
              <div class="currency-option-content">
                <div class="currency-option-content-name">ETH</div>
                <div class="currency-option-content-desc">crypto eth</div>
              </div>
            </div>
          </mc-select-option>
        </mc-select-group>
        <mc-select-group
          label="Fiatcurrencies"
          height="24px"
          :style="{ color: '#301A6D' }"
        >
          <mc-select-option value="USD" label="USD"
            ><div class="currency-option">
              <img src="./imgs/USD.svg" alt="USD" />
              <div class="currency-option-content">
                <div class="currency-option-content-name">USD</div>
                <div class="currency-option-content-desc">fiat usd</div>
              </div>
            </div></mc-select-option
          >
          <mc-select-option value="SGD" label="SGD"
            ><div class="currency-option">
              <img src="./imgs/SGD.svg" alt="SGD" />
              <div class="currency-option-content">
                <div class="currency-option-content-name">SGD</div>
                <div class="currency-option-content-desc">fiat sgd</div>
              </div>
            </div></mc-select-option
          >
          <mc-select-option value="EUR" label="EUR"
            ><div class="currency-option">
              <img src="./imgs/EUR.svg" alt="EUR" />
              <div class="currency-option-content">
                <div class="currency-option-content-name">EUR</div>
                <div class="currency-option-content-desc">fiat eur</div>
              </div>
            </div></mc-select-option
          >
        </mc-select-group>
      </mc-select>
    </div>
    <div class="tool-bar">
      <!-- <mc-button @click="changeDisabled">Change disabled</mc-button> -->
      <mc-button @click="handleSetValue">Set Value</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McSelect from "@mc-plus/components/mc-select/mc-select.vue";
import McSelectOption from "@mc-plus/components/mc-select/mc-select-option.vue";
import McSelectGroup from "@mc-plus/components/mc-select/mc-select-group.vue";

const selectValue = ref<string>();

const handleSetValue = () => {
  selectValue.value = "1";
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .content {
    width: 320px;
    background-color: pink;
  }

  .show-value {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tool-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: 0;
  }
}

.currency-option {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }

  .currency-option-content-name {
    font-weight: 700;
    color: #222;
    font-size: 14px;
  }

  .currency-option-content-desc {
    color: #808080;
    font-size: 12px;
  }
}
</style>
