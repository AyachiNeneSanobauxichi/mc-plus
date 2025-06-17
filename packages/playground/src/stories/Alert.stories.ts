import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import { McAlert } from "mc-plus";

const meta: Meta<typeof McAlert> = {
  title: "Alert",
  component: McAlert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["success", "info", "warning", "error"],
    },
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    closable: {
      control: "boolean",
    },
    showIcon: {
      control: "boolean",
    },
    height: {
      control: { type: "text" },
    },
    width: {
      control: { type: "text" },
    },
  },
  args: {
    title: "Alert Title",
    description: "This is an alert description",
  },
};

export default meta;

export const Demo: StoryObj<typeof McAlert> = {
  args: {
    type: "info",
    closable: true,
    showIcon: true,
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose" />`,
  }),
};

export const Success: StoryObj<typeof McAlert> = {
  args: {
    type: "success",
    title: "Success Alert",
    description: "This is a success alert with description",
    closable: true,
    showIcon: true,
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose" />`,
  }),
};

export const Warning: StoryObj<typeof McAlert> = {
  args: {
    type: "warning",
    title: "Warning Alert",
    description: "This is a warning alert with description",
    closable: true,
    showIcon: true,
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose" />`,
  }),
};

export const Error: StoryObj<typeof McAlert> = {
  args: {
    type: "error",
    title: "Error Alert",
    description: "This is an error alert with description",
    closable: true,
    showIcon: true,
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose" />`,
  }),
};

export const WithoutIcon: StoryObj<typeof McAlert> = {
  args: {
    type: "info",
    title: "Alert without Icon",
    description: "This alert doesn't show an icon",
    closable: true,
    showIcon: false,
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose" />`,
  }),
};

export const NotClosable: StoryObj<typeof McAlert> = {
  args: {
    type: "info",
    title: "Non-closable Alert",
    description: "This alert cannot be closed",
    closable: false,
    showIcon: true,
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose" />`,
  }),
};

export const WithSlotContent: StoryObj<typeof McAlert> = {
  args: {
    type: "info",
    closable: true,
    showIcon: true,
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose">
      <strong>Custom Content:</strong> This alert uses slot content instead of title and description props.
    </mc-alert>`,
  }),
};

export const CustomSize: StoryObj<typeof McAlert> = {
  args: {
    type: "success",
    title: "Custom Size Alert",
    description: "This alert has custom width and height",
    closable: true,
    showIcon: true,
    width: "500px",
    height: "80px",
  },
  render: (args) => ({
    components: { McAlert },
    setup() {
      const handleClose = action("close");
      return { args, handleClose };
    },
    template: `<mc-alert v-bind="args" @close="handleClose" />`,
  }),
};
