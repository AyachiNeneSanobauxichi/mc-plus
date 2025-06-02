import { onMounted, onUnmounted } from "vue";

function useWindowResize(callback: () => void) {
  onMounted(() => {
    window.addEventListener("resize", callback);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", callback);
  });
}

export default useWindowResize;
