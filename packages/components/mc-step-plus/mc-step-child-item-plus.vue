<template>
  <div class="mc-step-child-item-plus"></div>
</template>

<script setup lang="ts">
import type { McStepChildItemPlusProps } from "./types";
import { MC_STEP_CHILD_ITEM_PLUS } from "./constant";

// options
defineOptions({ name: MC_STEP_CHILD_ITEM_PLUS });

// props
defineProps<McStepChildItemPlusProps>();
</script>
