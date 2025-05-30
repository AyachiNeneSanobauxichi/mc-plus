import { createVNode, isVNode, render } from "vue";
import McLightBox from "./mc-light-box.vue";
import type { LightboxProps } from "./types";

// Container and overlay instances
let overlay: HTMLDivElement | null = null;
let container: HTMLDivElement | null = null;

// Create overlay
const createOverlay = () => {
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.className = "mc-lightbox-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9998";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.transition = "opacity 0.3s ease";
  overlay.style.opacity = "0"; // Start transparent
  document.body.appendChild(overlay);

  // Force a reflow to ensure the opacity transition works
  overlay.getBoundingClientRect();

  // Fade in
  overlay.style.opacity = "1";
  return overlay;
};

// Remove overlay
const removeOverlay = () => {
  if (overlay) {
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (overlay && document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      overlay = null;
      container = null;
    }, 300);
  }
};

// Get or create container
const getContainer = () => {
  if (container) return container;
  container = document.createElement("div");
  container.style.position = "relative";
  container.style.zIndex = "9999";
  return container;
};

// Create a lightbox instance
export const createLightbox = (options: LightboxProps | string = {}) => {
  let props: LightboxProps = {};

  // Handle string input
  if (typeof options === "string") {
    props = { content: options };
  }
  // Handle VNode
  else if (isVNode(options)) {
    props = { content: "" };
  }
  // Handle props object
  else {
    props = { ...options };
  }

  // Set defaults
  props.size = props.size || "medium";
  props.position = props.position || "center";
  props.maskClosable = props.maskClosable !== false; // default to true

  // Create overlay
  const overlayElement = createOverlay();

  // Create container
  const containerElement = getContainer();
  overlayElement.appendChild(containerElement);

  // Create wrapper div
  const lightboxWrapper = document.createElement("div");

  // Create lightbox VNode
  const lightboxVNode = createVNode(McLightBox, {
    ...props,
    modelValue: true, // Always show when created functionally
    onClose: () => {
      // Handle close
      removeOverlay();

      if (props.onClose) {
        props.onClose();
      }

      // Remove lightbox from DOM
      setTimeout(() => {
        render(null, lightboxWrapper);
      }, 300);
    },
    "onUpdate:modelValue": (value: boolean) => {
      if (!value) {
        removeOverlay();
        setTimeout(() => {
          render(null, lightboxWrapper);
        }, 300);
      }
    },
  });

  // Render lightbox
  render(lightboxVNode, lightboxWrapper);
  containerElement.appendChild(lightboxWrapper);

  // Get component instance
  const lightboxInstance = lightboxVNode.component?.exposed as { close: () => void };

  return {
    close: () => {
      lightboxInstance?.close();
    },
  };
};

// Shorthand methods
export const lightbox = createLightbox;
