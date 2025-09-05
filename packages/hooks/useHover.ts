import type { Ref } from "vue";
import { onBeforeMount, onMounted, ref } from "vue";

// use hover hook
const useHover = (el: Ref<HTMLElement | void>) => {
  const isHovering = ref<boolean>(false);

  const handleMouseEnter = () => {
    isHovering.value = true;
  };

  const handleMouseLeave = () => {
    isHovering.value = false;
  };

  onMounted(() => {
    if (el.value) {
      el.value.addEventListener("mouseenter", handleMouseEnter);
      el.value.addEventListener("mouseleave", handleMouseLeave);
    }
  });

  onBeforeMount(() => {
    if (el.value) {
      el.value.removeEventListener("mouseenter", handleMouseEnter);
      el.value.removeEventListener("mouseleave", handleMouseLeave);
    }
  });

  return {
    isHovering,
  };
};

export default useHover;
