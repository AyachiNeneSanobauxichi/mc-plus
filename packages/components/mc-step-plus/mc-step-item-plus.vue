<template>
  <div class="mc-step-item-plus"></div>
</template>

<script setup lang="ts">
import type { McStepItemPlusProps } from "./types";
import { MC_STEP_ITEM_PLUS } from "./constant";

// options
defineOptions({ name: MC_STEP_ITEM_PLUS });

// props
defineProps<McStepItemPlusProps>();
</script>
