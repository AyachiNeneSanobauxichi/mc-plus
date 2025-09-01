import { computed, inject } from "vue";
import { MC_TABLE_CTX_KEY } from "../constant";

// use table context
const useTableContext = () => {
  const tableCtx = inject(MC_TABLE_CTX_KEY, void 0);

  return {
    tableCtx,
    columns: tableCtx?.columns,
    data: tableCtx?.data,
    rowState: tableCtx?.rowState,
    pagination: tableCtx?.pagination,
    isLoading: computed(() => !!tableCtx?.isLoading.value),
    doSort: tableCtx?.handleSort,
    handlePagination: tableCtx?.handlePagination,
    setRowStateByIndex: tableCtx?.setRowStateByIndex,
  };
};

export default useTableContext;
