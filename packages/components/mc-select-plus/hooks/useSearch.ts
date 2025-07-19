import type { _FilteredOptionNode, _OptionNode } from "../types";
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { filter, includes, isEmpty, map, toLower, uniqBy } from "lodash-es";
import { useProp } from "@mc-plus/hooks";

const useSearch = (options?: Ref<_OptionNode[]>) => {
  // search value
  const searchValue = ref<string>("");

  // clear search value
  const clearSearchValue = () => {
    searchValue.value = "";
  };

  // search prop
  const search = useProp<boolean>("search");

  // is search
  const isSearch = computed(() => !!search.value);

  // has search value
  const hasSearchValue = computed(() => {
    return isSearch.value && !isEmpty(searchValue.value);
  });

  // filtered options
  const filteredOptions = computed<_FilteredOptionNode[]>(() => {
    // if no options, return empty array
    if (!options?.value.length) return [];
    // filter options
    return map(
      filter(options.value, (item) => {
        return includes(toLower(item.label), toLower(searchValue.value));
      }),
      (item) => ({ value: item.value, group: item.group })
    );
  });

  // filtered groups
  const filteredGroups = computed(() => {
    // if no filtered options, return empty array
    if (!filteredOptions.value.length) return [];
    // get unique groups
    return map(uniqBy(filteredOptions.value, "group"), (item) => item.group);
  });

  return {
    searchValue,
    isSearch,
    hasSearchValue,
    filteredOptions,
    filteredGroups,
    clearSearchValue,
  };
};

export default useSearch;
