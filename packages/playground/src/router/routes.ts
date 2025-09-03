import type { RouteRecordRaw } from "vue-router";

// routes
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/table-plus",
    name: "TablePlus",
    component: () => import("../views/mc-table-plus/playground-table-plus.vue"),
    meta: {
      title: "Mc Table Plus",
    },
  },
  {
    path: "/textarea",
    name: "Textarea",
    component: () => import("../views/mc-textarea/playground-textarea.vue"),
    meta: {
      title: "Mc Textarea",
    },
  },
  {
    path: "/form",
    name: "Form",
    component: () => import("../views/mc-form/playground-form.vue"),
    meta: {
      title: "Mc Form",
    },
  },
  {
    path: "/input-group",
    name: "InputGroup",
    component: () =>
      import("../views/mc-input-group/playground-input-group.vue"),
    meta: {
      title: "Mc Input Group",
    },
  },
  {
    path: "/select-plus",
    name: "SelectPlus",
    component: () =>
      import("../views/mc-select-plus/playground-select-plus.vue"),
    meta: {
      title: "Mc Select Plus",
    },
  },
  {
    path: "/alert-message",
    name: "AlertMessage",
    component: () =>
      import("../views/mc-alert-message/playground-alert-message.vue"),
    meta: {
      title: "Mc Alert Message",
    },
  },
  {
    path: "/toast",
    name: "Toast",
    component: () => import("../views/mc-toast/playground-toast.vue"),
    meta: {
      title: "Mc Toast",
    },
  },
  {
    path: "/count",
    name: "Count",
    component: () => import("../views/mc-count/playground-count.vue"),
    meta: {
      title: "Mc Count",
    },
  },
  {
    path: "/reset",
    name: "Reset",
    component: () => import("../views/mc-reset/playground-reset.vue"),
    meta: {
      title: "Mc Reset",
    },
  },
  {
    path: "/copy",
    name: "Copy",
    component: () => import("../views/mc-copy/playground-copy.vue"),
    meta: {
      title: "Mc Copy",
    },
  },
  {
    path: "/lightbox",
    name: "Lightbox",
    component: () => import("../views/mc-lightbox/playground-lightbox.vue"),
    meta: {
      title: "Mc Lightbox",
    },
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../views/mc-upload/playground-upload.vue"),
    meta: {
      title: "Mc Upload",
    },
  },
  {
    path: "/progress-bar",
    name: "ProgressBar",
    component: () =>
      import("../views/mc-progress-bar/playground-progress-bar.vue"),
    meta: {
      title: "Mc Progress Bar",
    },
  },
  {
    path: "/title",
    name: "Title",
    component: () => import("../views/mc-title/playground-title.vue"),
    meta: {
      title: "Mc Title",
    },
  },
  {
    path: "/title-toolbar",
    name: "TitleToolbar",
    component: () =>
      import("../views/mc-title-toolbar/playground-title-toolbar.vue"),
    meta: {
      title: "Mc Title Toolbar",
    },
  },
  {
    path: "/tooltip",
    name: "Tooltip",
    component: () => import("../views/mc-tooltip/playgroundTooltip.vue"),
    meta: {
      title: "Mc Tooltip",
    },
  },
  {
    path: "/checkbox",
    name: "Checkbox",
    component: () => import("../views/mc-checkbox/playground-checkbox.vue"),
    meta: {
      title: "Mc Checkbox",
    },
  },
  {
    path: "/otp",
    name: "Otp",
    component: () => import("../views/mc-otp/playground-otp.vue"),
    meta: {
      title: "Mc OTP",
    },
  },
  {
    path: "/button",
    name: "Button",
    component: () => import("../views/mc-button/playground-button.vue"),
    meta: {
      title: "Mc Button",
    },
  },
  {
    path: "/currency-icon",
    name: "CurrencyIcon",
    component: () =>
      import("../views/mc-currency-icon/playground-currency-icon.vue"),
    meta: {
      title: "Mc Currency Icon",
    },
  },
  {
    path: "/drawer",
    name: "Drawer",
    component: () => import("../views/mc-drawer/playground-drawer.vue"),
    meta: {
      title: "Mc Drawer",
    },
  },
  {
    path: "/icon",
    name: "Icon",
    component: () => import("../views/mc-icon/playground-icon.vue"),
    meta: {
      title: "Mc Icon",
    },
  },
  {
    path: "/input",
    name: "Input",
    component: () => import("../views/mc-input/playground-input.vue"),
    meta: {
      title: "Mc Input",
    },
  },
  {
    path: "/secondary-menu",
    name: "SecondaryMenu",
    component: () =>
      import("../views/mc-secondary-menu/playground-secondary-menu.vue"),
    meta: {
      title: "Mc Secondary Menu",
    },
  },
  {
    path: "/select",
    name: "Select",
    component: () => import("../views/mc-select/playground-select.vue"),
    meta: {
      title: "Mc Select",
    },
  },
  {
    path: "/status",
    name: "Status",
    component: () => import("../views/mc-status/playground-status.vue"),
    meta: {
      title: "Mc Status",
    },
  },
  {
    path: "/step",
    name: "Step",
    component: () => import("../views/mc-step/playground-step.vue"),
    meta: {
      title: "Mc Step",
    },
  },
  {
    path: "/step-v2",
    name: "StepV2",
    component: () => import("../views/mc-step-v2/playground-step-v2.vue"),
    meta: {
      title: "Mc Step V2",
    },
  },
  {
    path: "/switch",
    name: "Switch",
    component: () => import("../views/mc-switch/playground-switch.vue"),
    meta: {
      title: "Mc Switch",
    },
  },
  {
    path: "/tab",
    name: "Tab",
    component: () => import("../views/mc-tab/playground-tab.vue"),
    meta: {
      title: "Mc Tab",
    },
  },
  {
    path: "/table",
    name: "Table",
    component: () => import("../views/mc-table/playground-table.vue"),
    meta: {
      title: "Mc Table",
    },
  },
  {
    path: "/tag",
    name: "Tag",
    component: () => import("../views/mc-tag/playground-tag.vue"),
    meta: {
      title: "Mc Tag",
    },
  },
  {
    path: "/loading",
    name: "Loading",
    component: () => import("../views/mc-loading/playground-loading.vue"),
    meta: {
      title: "Mc Loading",
    },
  },
  {
    path: "/step-plus",
    name: "StepPlus",
    component: () => import("../views/mc-step-plus/playground-step-plus.vue"),
    meta: {
      title: "Mc Step Plus",
    },
  },
  {
    path: "/vue-draggable-plus",
    name: "VueDraggablePlus",
    component: () => import("../views/vue-draggable/playground-draggable.vue"),
    meta: {
      title: "Vue Draggable Plus",
    },
  },
];
