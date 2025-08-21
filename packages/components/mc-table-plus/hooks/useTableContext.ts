import { inject } from "vue";
import { MC_TABLE_CTX_KEY } from "../constant";

// use table context
const useTableContext = () => {
  const tableCtx = inject(MC_TABLE_CTX_KEY, void 0);

  return {
    tableCtx,
    doSort: tableCtx?.handleSort,
    pagination: tableCtx?.pagination,
  };
};

export default useTableContext;
