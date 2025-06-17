import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import { McToast } from "mc-plus";
import { ICON_OPTIONS } from "./constant/options";

const meta: Meta<typeof McToast> = {
  title: "Toast",
  component: McToast,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "info", "warning", "error"],
    },
    title: {
      control: { type: "text" },
    },
    message: {
      control: { type: "text" },
    },
    icon: {
      control: { type: "select" },
      options: [undefined, ...ICON_OPTIONS],
    },
    showClose: {
      control: "boolean",
    },
    duration: {
      control: { type: "number" },
    },
    position: {
      control: { type: "select" },
      options: ["top", "bottom"],
    },
  },
  args: {
    title: "Toast Title",
    message: "This is a toast message",
  },
};

export default meta;

export const Demo: StoryObj<typeof McToast> = {
  args: {
    type: "primary",
    icon: "Info",
    showClose: true,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const Primary: StoryObj<typeof McToast> = {
  args: {
    type: "primary",
    title: "Primary Toast",
    message: "This is a primary toast notification",
    icon: "Info",
    showClose: true,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const Success: StoryObj<typeof McToast> = {
  args: {
    type: "success",
    title: "Success Toast",
    message: "Operation completed successfully!",
    icon: "Tick",
    showClose: true,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const Warning: StoryObj<typeof McToast> = {
  args: {
    type: "warning",
    title: "Warning Toast",
    message: "Please check your input and try again",
    icon: "Error_02",
    showClose: true,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const Error: StoryObj<typeof McToast> = {
  args: {
    type: "error",
    title: "Error Toast",
    message: "Something went wrong. Please try again later.",
    icon: "Error",
    showClose: true,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const Info: StoryObj<typeof McToast> = {
  args: {
    type: "info",
    title: "Info Toast",
    message: "Here's some helpful information for you",
    icon: "Info_02",
    showClose: true,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const WithoutIcon: StoryObj<typeof McToast> = {
  args: {
    type: "primary",
    title: "Toast without Icon",
    message: "This toast doesn't have an icon",
    showClose: true,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const NotClosable: StoryObj<typeof McToast> = {
  args: {
    type: "info",
    title: "Non-closable Toast",
    message: "This toast cannot be manually closed",
    icon: "Info",
    showClose: false,
    duration: 0,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const AutoClose: StoryObj<typeof McToast> = {
  args: {
    type: "success",
    title: "Auto-closing Toast",
    message: "This toast will automatically close after 3 seconds",
    icon: "Tick",
    showClose: true,
    duration: 3000,
    position: "top",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};

export const BottomPosition: StoryObj<typeof McToast> = {
  args: {
    type: "warning",
    title: "Bottom Position Toast",
    message: "This toast appears at the bottom",
    icon: "Error_02",
    showClose: true,
    duration: 0,
    position: "bottom",
  },
  render: (args) => ({
    components: { McToast },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-toast v-bind="args" @close="handleClose" />`,
  }),
};
