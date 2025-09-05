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
    path: "/alert-message",
    name: "AlertMessage",
    component: () => import("../views/mc-plus/mc-alert-message/index.vue"),
    meta: {
      title: "Mc Alert Message",
    },
  },
  {
    path: "/button",
    name: "Button",
    component: () => import("../views/mc-plus/mc-button/index.vue"),
    meta: {
      title: "Mc Button",
    },
  },
  {
    path: "/checkbox",
    name: "Checkbox",
    component: () => import("../views/mc-plus/mc-checkbox/index.vue"),
    meta: {
      title: "Mc Checkbox",
    },
  },
  {
    path: "/copy",
    name: "Copy",
    component: () => import("../views/mc-plus/mc-copy/index.vue"),
    meta: {
      title: "Mc Copy",
    },
  },
  {
    path: "/count",
    name: "Count",
    component: () => import("../views/mc-plus/mc-count/index.vue"),
    meta: {
      title: "Mc Count",
    },
  },
  {
    path: "/currency-icon",
    name: "CurrencyIcon",
    component: () => import("../views/mc-plus/mc-currency-icon/index.vue"),
    meta: {
      title: "Mc Currency Icon",
    },
  },
  {
    path: "/drawer",
    name: "Drawer",
    component: () => import("../views/mc-plus/mc-drawer/index.vue"),
    meta: {
      title: "Mc Drawer",
    },
  },
  {
    path: "/form",
    name: "Form",
    component: () => import("../views/mc-plus/mc-form/index.vue"),
    meta: {
      title: "Mc Form",
    },
  },
  {
    path: "/icon",
    name: "Icon",
    component: () => import("../views/mc-plus/mc-icon/index.vue"),
    meta: {
      title: "Mc Icon",
    },
  },
  {
    path: "/input",
    name: "Input",
    component: () => import("../views/mc-plus/mc-input/index.vue"),
    meta: {
      title: "Mc Input",
    },
  },
  {
    path: "/input-group",
    name: "InputGroup",
    component: () => import("../views/mc-plus/mc-input-group/index.vue"),
    meta: {
      title: "Mc Input Group",
    },
  },
  {
    path: "/lightbox",
    name: "Lightbox",
    component: () => import("../views/mc-plus/mc-lightbox/index.vue"),
    meta: {
      title: "Mc Lightbox",
    },
  },
  {
    path: "/loading",
    name: "Loading",
    component: () => import("../views/mc-plus/mc-loading/index.vue"),
    meta: {
      title: "Mc Loading",
    },
  },
  {
    path: "/otp",
    name: "Otp",
    component: () => import("../views/mc-plus/mc-otp/index.vue"),
    meta: {
      title: "Mc OTP",
    },
  },
  {
    path: "/progress-bar",
    name: "ProgressBar",
    component: () => import("../views/mc-plus/mc-progress-bar/index.vue"),
    meta: {
      title: "Mc Progress Bar",
    },
  },
  {
    path: "/reset",
    name: "Reset",
    component: () => import("../views/mc-plus/mc-reset/index.vue"),
    meta: {
      title: "Mc Reset",
    },
  },
  {
    path: "/secondary-menu",
    name: "SecondaryMenu",
    component: () => import("../views/mc-plus/mc-secondary-menu/index.vue"),
    meta: {
      title: "Mc Secondary Menu",
    },
  },
  {
    path: "/select-plus",
    name: "SelectPlus",
    component: () => import("../views/mc-plus/mc-select-plus/index.vue"),
    meta: {
      title: "Mc Select Plus",
    },
  },
  {
    path: "/status",
    name: "Status",
    component: () => import("../views/mc-plus/mc-status/index.vue"),
    meta: {
      title: "Mc Status",
    },
  },
  {
    path: "/step",
    name: "Step",
    component: () => import("../views/mc-plus/mc-step/index.vue"),
    meta: {
      title: "Mc Step",
    },
  },
  {
    path: "/step-plus",
    name: "StepPlus",
    component: () => import("../views/mc-plus/mc-step-plus/index.vue"),
    meta: {
      title: "Mc Step Plus",
    },
  },
  {
    path: "/switch",
    name: "Switch",
    component: () => import("../views/mc-plus/mc-switch/index.vue"),
    meta: {
      title: "Mc Switch",
    },
  },
  {
    path: "/tab",
    name: "Tab",
    component: () => import("../views/mc-plus/mc-tab/index.vue"),
    meta: {
      title: "Mc Tab",
    },
  },
  {
    path: "/table",
    name: "Table",
    component: () => import("../views/mc-plus/mc-table/index.vue"),
    meta: {
      title: "Mc Table",
    },
  },
  {
    path: "/table-plus",
    name: "TablePlus",
    component: () => import("../views/mc-plus/mc-table-plus/index.vue"),
    meta: {
      title: "Mc Table Plus",
    },
  },
  {
    path: "/tag",
    name: "Tag",
    component: () => import("../views/mc-plus/mc-tag/index.vue"),
    meta: {
      title: "Mc Tag",
    },
  },
  {
    path: "/textarea",
    name: "Textarea",
    component: () => import("../views/mc-plus/mc-textarea/index.vue"),
    meta: {
      title: "Mc Textarea",
    },
  },
  {
    path: "/title",
    name: "Title",
    component: () => import("../views/mc-plus/mc-title/index.vue"),
    meta: {
      title: "Mc Title",
    },
  },
  {
    path: "/title-toolbar",
    name: "TitleToolbar",
    component: () => import("../views/mc-plus/mc-title-toolbar/index.vue"),
    meta: {
      title: "Mc Title Toolbar",
    },
  },
  {
    path: "/toast",
    name: "Toast",
    component: () => import("../views/mc-plus/mc-toast/index.vue"),
    meta: {
      title: "Mc Toast",
    },
  },
  {
    path: "/tooltip",
    name: "Tooltip",
    component: () => import("../views/mc-plus/mc-tooltip/index.vue"),
    meta: {
      title: "Mc Tooltip",
    },
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../views/mc-plus/mc-upload/index.vue"),
    meta: {
      title: "Mc Upload",
    },
  },
  {
    path: "/vue-draggable",
    name: "VueDraggable",
    component: () => import("../views/vue-draggable/index.vue"),
    meta: {
      title: "Vue Draggable",
    },
  },
];
