import type { ComputedRef } from "vue";
import { getCurrentInstance, computed } from "vue";

function useProp<T>(propName: string): ComputedRef<T | void> {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useProp must be used within a component");
  }

  return computed(() => (instance?.proxy?.$props as any)?.[propName] as T);
}

export default useProp;
