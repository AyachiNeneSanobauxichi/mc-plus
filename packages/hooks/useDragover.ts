import { isFunction } from "lodash-es";
import type { Ref } from "vue";
import { onMounted, onBeforeUnmount, ref } from "vue";

// use dragover hook
const useDragover = (
  wrapper: Ref<HTMLElement | undefined>,
  events: {
    onDragEnter?: (e: DragEvent) => void;
    onDragLeave?: (e: DragEvent) => void;
    onDragover?: (e: DragEvent) => void;
    onDrop?: (e: DragEvent) => void;
  }
) => {
  // is dragover
  const isDragover = ref(false);

  // set dragover
  const setDragover = (val: boolean) => {
    if (val === isDragover.value) return;
    isDragover.value = val;
  };

  // set dragover event
  const setDragoverEvent = () => {
    wrapper.value?.addEventListener("dragenter", handleDragEnter);
    wrapper.value?.addEventListener("dragleave", handleDragLeave);
    wrapper.value?.addEventListener("dragover", handleDragover);
    wrapper.value?.addEventListener("drop", handleDrop);
  };

  // remove dragover event
  const removeDragoverEvent = () => {
    wrapper.value?.removeEventListener("dragenter", handleDragEnter);
    wrapper.value?.removeEventListener("dragleave", handleDragLeave);
    wrapper.value?.removeEventListener("dragover", handleDragover);
    wrapper.value?.removeEventListener("drop", handleDrop);
  };

  // handle drag enter
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    setDragover(true);
    isFunction(events.onDragEnter) && events.onDragEnter(e);
  };

  // handle drag leave
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setDragover(false);
    isFunction(events.onDragLeave) && events.onDragLeave(e);
  };

  // handle dragover
  const handleDragover = (e: DragEvent) => {
    e.preventDefault();
    isFunction(events.onDragover) && events.onDragover(e);
  };

  // handle drop
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragover(false);
    isFunction(events.onDrop) && events.onDrop(e);
  };

  // mount
  onMounted(() => {
    setDragoverEvent();
  });

  // unmount
  onBeforeUnmount(() => {
    removeDragoverEvent();
  });

  return { isDragover };
};

export default useDragover;
