import type { McTablePaginationType } from "../types";
import { getCurrentInstance, onMounted, reactive, watch } from "vue";
import { assign, debounce } from "lodash-es";
import { useProp } from "@mc-plus/hooks";

// pagination default
const PAGINATION_DEFAULT: McTablePaginationType = {
  pageNum: 1,
  pageSize: 25,
  total: 1,
  pageSizes: [25, 50, 75, 100],
};

// use pagination
const usePagination = () => {
  // pagination props
  const paginationProps = useProp<McTablePaginationType>("pagination");

  // pagination
  const pagination = reactive<McTablePaginationType>({ ...PAGINATION_DEFAULT });

  // init pagination
  onMounted(() => {
    setPagination(paginationProps.value || PAGINATION_DEFAULT);
  });

  // set pagination
  const setPagination = (_pagination: Partial<McTablePaginationType>) => {
    assign(pagination, { ..._pagination });
  };

  // pagination props change
  watch(
    () => paginationProps.value,
    (_pagination) => {
      setPagination(_pagination || PAGINATION_DEFAULT);
    },
    {
      deep: true,
    }
  );

  // instance
  const instance = getCurrentInstance();

  // emit pagination
  const emitPagination = debounce(() => {
    instance?.emit("change:pagination", pagination);
  }, 300);

  // handle pagination
  const handlePagination = (_pagination: Partial<McTablePaginationType>) => {
    setPagination(_pagination);
    emitPagination();
  };

  return {
    pagination,
    handlePagination,
  };
};

export default usePagination;
