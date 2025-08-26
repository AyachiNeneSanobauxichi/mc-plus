import { computed, inject } from "vue";
import { MC_TABLE_CTX_KEY } from "../constant";

// use table context
const useTableContext = () => {
  const tableCtx = inject(MC_TABLE_CTX_KEY, void 0);

  return {
    tableCtx,
    isLoading: computed(() => !!tableCtx?.isLoading.value),
    pagination: tableCtx?.pagination,
    doSort: tableCtx?.handleSort,
    handlePagination: tableCtx?.handlePagination,
  };
};

export default useTableContext;
