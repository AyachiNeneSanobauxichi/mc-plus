import { onMounted, onUnmounted, watch, type Ref } from "vue";
import { throttle } from "lodash-es";

function useResizeObserver(
  domRef: Ref<Element | undefined>,
  callback: (rect: DOMRectReadOnly) => void,
  duration: number = 300
) {
  const resizeObserver = new ResizeObserver(
    throttle((entries) => {
      for (let entry of entries) {
        callback(entry.contentRect);
      }
    }, duration)
  );

  const observe = (ele: Element) => {
    resizeObserver.observe(ele);
  };

  const unobserve = (ele: Element) => {
    resizeObserver.unobserve(ele);
  };

  onMounted(() => {
    if (domRef.value) observe(domRef.value);
  });

  onUnmounted(() => {
    if (domRef.value) unobserve(domRef.value);
  });

  watch(domRef, (val) => {
    if (val) observe(val);
  });

  return { resizeObserver, observe, unobserve };
}

export default useResizeObserver;
