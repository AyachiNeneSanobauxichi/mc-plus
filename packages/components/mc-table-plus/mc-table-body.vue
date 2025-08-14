<template>
  <table class="mc-table-body">
    <tbody class="mc-table-body-tbody">
      <tr class="mc-table-body-tr"></tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { McTablePlusBodyProps } from "./types";
import { MC_TABLE_BODY } from "./constant";

// options
defineOptions({ name: MC_TABLE_BODY });

// props
defineProps<McTablePlusBodyProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body.scss";
</style>
