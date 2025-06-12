import { onMounted, onUnmounted, type Ref } from "vue";
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

  onMounted(() => {
    if (!domRef.value) return;
    resizeObserver.observe(domRef.value);
  });

  onUnmounted(() => {
    if (!domRef.value) return;
    resizeObserver.unobserve(domRef.value);
  });

  return { resizeObserver };
}

export default useResizeObserver;
