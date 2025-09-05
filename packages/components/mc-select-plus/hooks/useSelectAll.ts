import type { Ref } from "vue";
import type { _OptionNode, SelectPlusValue } from "../types";
import { ref, watchEffect } from "vue";
import { isFunction } from "lodash-es";

const useSelectAll = (
  isMulti: Ref<boolean>,
  selectedOption: Ref<SelectPlusValue | SelectPlusValue[]>,
  selectOptions: Ref<_OptionNode[]>,
  handleSelectAll: () => void
) => {
  // is select all
  const isSelectAll = ref<boolean>(false);

  // is select partial
  const isSelectPartial = ref<boolean>(false);

  // watch select partial
  watchEffect(() => {
    if (!isMulti.value) return;
    const _selectedOption = selectedOption.value as SelectPlusValue[];
    if (
      _selectedOption?.length &&
      selectOptions.value?.length &&
      _selectedOption?.length === selectOptions.value?.length
    ) {
      isSelectAll.value = true;
    } else if (_selectedOption?.length > 0) {
      isSelectAll.value = false;
      isSelectPartial.value = true;
    } else {
      isSelectAll.value = false;
      isSelectPartial.value = false;
    }
  });

  // select all
  const selectAll = () => {
    if (isMulti.value && isFunction(handleSelectAll)) {
      handleSelectAll();
    }
  };

  return {
    isSelectAll,
    isSelectPartial,
    selectAll,
  };
};

export default useSelectAll;
