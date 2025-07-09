<template>
  <div class="playground-currency-icon">
    <mc-currency-icon
      :width="296"
      currency="USD"
      desc="US Dollar"
      direction="vertical"
      cdn-url="https://d1850j7ztm58xd.cloudfront.net/trader-site-v3-static/currency"
    ></mc-currency-icon>
  </div>
</template>

<script setup lang="ts">
import McCurrencyIcon from "../../../../components/mc-currency-icon/mc-currency-icon.vue";
</script>

<style scoped lang="scss"></style>
