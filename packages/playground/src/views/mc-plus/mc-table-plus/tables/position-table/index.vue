<template>
  <div class="position-table">
    <mc-table-plus :data="positionList" :loading="loading">
      <mc-table-column prop="tokenName" label="Token Name" sortable>
        <template #value="{ value, row }">
          <link-cell :link="value" :desc="row.tokenDesc" />
        </template>
      </mc-table-column>
      <mc-table-column
        prop="position"
        label="Position"
        column-align="right"
        sortable
      ></mc-table-column>
      <mc-table-column
        prop="unrealizedPnl"
        label="Unrealized P/L"
        column-align="right"
        sortable
      >
        <template #value="{ value, row }">
          <pl-cell
            :value="value"
            :isPositive="row.isPositive"
            :changeRate="row.changeRate"
          />
        </template>
        <template #header-title>
          <div class="title-tooltip">
            <div class="title-tooltip-text">Unrealized P/L</div>
            <div class="title-tooltip-icon">
              <mc-tooltip
                content="Unrealized P/L"
                icon-name="Help"
                :icon-size="20"
              />
            </div>
          </div>
        </template>
      </mc-table-column>
      <mc-table-column
        prop="realizedPnl"
        label="Realized P/L"
        column-align="right"
        sortable
      >
        <template #value="{ value, row }">
          <pl-cell
            :value="value"
            :isPositive="row.isPositive"
            :changeRate="row.changeRate"
          />
        </template>
        <template #header-title>
          <div class="title-tooltip">
            <div class="title-tooltip-text">Realized P/L</div>
            <div class="title-tooltip-icon">
              <mc-tooltip
                content="Realized P/L"
                icon-name="Help"
                :icon-size="20"
              />
            </div>
          </div>
        </template>
      </mc-table-column>
      <mc-table-column
        prop="todayPnl"
        label="Today P/L"
        column-align="right"
        sortable
      >
        <template #value="{ value, row }">
          <pl-cell
            :value="value"
            :isPositive="row.isPositive"
            :changeRate="row.changeRate"
          />
        </template>
      </mc-table-column>
      <mc-table-column prop="price" label="Price" column-align="right" sortable>
        <template #header-title>
          <div class="title-tooltip">
            <div class="title-tooltip-text">Price</div>
            <div class="title-tooltip-icon">
              <mc-tooltip content="Price" icon-name="Help" :icon-size="20" />
            </div>
          </div>
        </template>
      </mc-table-column>
      <mc-table-column
        prop="quantity"
        label="Quantity"
        desc="Available"
        column-align="right"
        sortable
      >
        <template #value="{ value, row }">
          <desc-cell :value="value" :desc="row.availableQuantity" />
        </template>
      </mc-table-column>
    </mc-table-plus>
  </div>
</template>

<script setup lang="ts">
import type { PositionTableRow } from "../../mock/types";
import { onMounted, ref } from "vue";
import McTablePlus from "../../../../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../../../../components/mc-table-plus/mc-table-column.vue";
import LinkCell from "../components/link-cell/index.vue";
import PlCell from "../components/pl-cell/index.vue";
import DescCell from "../components/desc-cell/index.vue";
import { McTooltip } from "mc-plus";
import { getPositionList } from "../../mock/apis";

// position list
const positionList = ref<PositionTableRow[]>([]);

// loading
const loading = ref<boolean>(false);

// init data
onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await getPositionList();
    positionList.value = data;
    loading.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

.position-table {
  .title-tooltip {
    @include mixin.flex-center($justify: flex-start, $gap: 8px);

    .title-tooltip-icon {
      font-weight: 400;
      font-size: 16px;
    }
  }
}
</style>
