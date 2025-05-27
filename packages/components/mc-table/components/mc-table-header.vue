<!--
 * @Author: Tieju yang
 * @Date: 2025-05-26 13:39:17
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-27 10:22:40
-->
<template>
  <div class="mc-table__header-wrapper" ref="headerWrapper" v-if="showHeader">
    <table class="mc-table__header" cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col v-for="(column, index) in columns" :key="index" :width="column.width" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index" :class="[column.headerClassName, column.align ? `is-${column.align}` : '', column.fixed ? `is-fixed-${typeof column.fixed === 'boolean' ? 'left' : column.fixed}` : '', column.sortable ? 'is-sortable' : '', getSortClass(column.prop)]" @click="handleHeaderClick(column, $event)">
            <div class="mc-table__header-cell">
              <span class="mc-table__header-label">
                <slot :name="`header-${column.slot || column.prop}`" :column="column" :index="index">
                  {{ column.label }}
                </slot>
              </span>

              <!-- 排序图标 -->
              <span v-if="column.sortable" class="mc-table__sort-caret">
                <mc-icon v-if="getSortOrder(column.prop) === 'asc'" name="Up-Chevron02" class="mc-table__sort-icon" :class="{ 'is-active': getSortOrder(column.prop) === 'asc' }"></mc-icon>
                <mc-icon v-else name="Down-Chevron02" class="mc-table__sort-icon" :class="{ 'is-active': getSortOrder(column.prop) === 'desc' }"></mc-icon>
              </span>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mcIcon from "../../mc-icon/mc-icon.vue";
import type { SortOrder, TableColumn } from "../types";

export interface McTableHeaderProps {
  columns: TableColumn[];
  showHeader?: boolean;
  getSortOrder?: (prop: string) => SortOrder;
}

interface Emits {
  (e: "header-click", column: TableColumn, event: Event): void;
  (e: "sort-change", column: TableColumn): void;
}

const props = withDefaults(defineProps<McTableHeaderProps>(), {
  showHeader: true,
  getSortOrder: () => null,
});

const emit = defineEmits<Emits>();

const headerWrapper = ref<HTMLDivElement>();

function handleHeaderClick(column: TableColumn, event: Event) {
  // 如果是可排序的列，处理排序
  if (column.sortable) {
    emit("sort-change", column);
  }

  emit("header-click", column, event);
}

function getSortClass(prop: string): string {
  const order = props.getSortOrder(prop);
  if (order === "asc") return "is-sort-asc";
  if (order === "desc") return "is-sort-desc";
  return "";
}

defineExpose({
  headerWrapper,
});
</script>

<style scoped lang="scss">
@use "../index.scss";
</style>
