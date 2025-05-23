import { createVNode, isVNode, render } from "vue";
import McToast from "./mc-toast.vue";
import type { ToastProps } from "./types";

// Container and overlay instances
const containers: Record<string, HTMLDivElement> = {};
let overlay: HTMLDivElement | null = null;

// Create overlay
const createOverlay = () => {
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.className = "mc-toast-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9998";
  overlay.style.transition = "opacity 0.1s ease";
  overlay.style.opacity = "0"; // Start transparent
  document.body.appendChild(overlay);
  // Force a reflow to ensure the opacity transition works
  overlay.getBoundingClientRect();

  // Fade in
  overlay.style.opacity = "1";
  return overlay;
};

// Remove overlay with fade-out animation
const removeOverlay = () => {
  if (overlay && document.body.contains(overlay)) {
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (overlay && document.body.contains(overlay)) {
        document.body.removeChild(overlay);
        console.log("removeOverlay", new Date().getTime());
        overlay = null;
      }
    }, 300); // Same duration as the toast animation
  }
};

// Get or create container
const getContainer = (position: string) => {
  if (containers[position]) return containers[position];
  const container = document.createElement("div");
  container.className = "mc-toast-container";
  container.style.position = "fixed";
  container.style.left = "50%";
  container.style.top = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  document.body.appendChild(container);
  containers[position] = container;

  return container;
};

// Create a toast instance
export const createToast = (options: ToastProps | string) => {
  let props: ToastProps = {};

  // Handle string input
  if (typeof options === "string") {
    props = { message: options };
  }
  // Handle VNode
  else if (isVNode(options)) {
    props = { message: "" };
  }
  // Handle props object
  else {
    props = { ...options };
  }

  // Set defaults
  props.position = props.position || "top";

  // Create overlay
  createOverlay();

  // Create container
  const container = getContainer(props.position);

  // Create wrapper div
  const toastWrapper = document.createElement("div");

  // Create toast VNode
  const toastVNode = createVNode(McToast, {
    ...props,
    onClose: () => {
      // Handle close

      // Start overlay fade-out at the same time as toast fade-out
      if (container.childNodes.length <= 1) {
        removeOverlay();
      }

      if (props.onClose) {
        props.onClose();
      }

      // Remove toast from DOM
      setTimeout(() => {
        render(null, toastWrapper);
        if (container.contains(toastWrapper)) {
          container.removeChild(toastWrapper);
        }

        // Clean up container if empty
        if (container.childNodes.length === 0) {
          if (document.body.contains(container)) {
            document.body.removeChild(container);
          }
          delete containers[props.position as string];
        }
      }, 300);
    },
  });

  // Render toast
  render(toastVNode, toastWrapper);
  container.appendChild(toastWrapper);

  // Get component instance
  const toastInstance = toastVNode.component?.exposed as { close: () => void };

  return {
    close: () => {
      toastInstance?.close();
    },
  };
};

// Shorthand methods
export const toast = createToast;

export const toastPrimary = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "primary", title: "Info", icon: "Info" });
  }
  return createToast({ title: "Info", icon: "Info", ...options, type: "primary" });
};

export const toastSuccess = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "success", title: "Success", icon: "Tick" });
  }
  return createToast({ title: "Success", icon: "Tick", ...options, type: "success" });
};

export const toastWarning = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "warning", title: "Warning", icon: "Error_02" });
  }
  return createToast({ title: "Warning", icon: "Error_02", ...options, type: "warning" });
};

export const toastError = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "error", title: "Error", icon: "Error" });
  }
  return createToast({ title: "Error", icon: "Error", ...options, type: "error" });
};
