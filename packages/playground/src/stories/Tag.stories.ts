import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import { McTag } from "mc-plus";
import { ICON_OPTIONS } from "./constant/options";

const meta: Meta<typeof McTag> = {
  title: "Tag",
  component: McTag,
  tags: ["autodocs"],
  argTypes: {
    default: {
      control: { type: "text" },
      description: "Tag content",
    },
    type: {
      control: { type: "select" },
      options: ["primary", "plain"],
      description: "Tag type",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tag size",
    },
    radius: {
      control: { type: "select" },
      options: ["default", "round"],
      description: "Tag border radius type",
    },
    disabled: {
      control: "boolean",
      description: "Whether the tag is disabled",
    },
    selected: {
      control: "boolean",
      description: "Whether the tag is selected",
    },
    closable: {
      control: "boolean",
      description: "Whether the tag is closable",
    },
    icon: {
      control: { type: "select" },
      options: ICON_OPTIONS,
      description: "Icon name",
    },
    color: {
      control: { type: "color" },
      description: "Custom color for legacy support",
    },
    backgroundColor: {
      control: { type: "color" },
      description: "Custom background color",
    },
    textColor: {
      control: { type: "color" },
      description: "Custom text color",
    },
    selectedBackgroundColor: {
      control: { type: "color" },
      description: "Custom background color when selected",
    },
    selectedTextColor: {
      control: { type: "color" },
      description: "Custom text color when selected",
    },
    height: {
      control: { type: "text" },
      description: "Custom height",
    },
    width: {
      control: { type: "text" },
      description: "Custom width",
    },
  },
  args: {
    default: "Tag Content",
  },
};

export default meta;

export const Demo: StoryObj<typeof McTag> = {
  args: {
    type: "primary",
    size: "medium",
    radius: "default",
    disabled: false,
    selected: false,
    closable: false,
  },
  render: (args) => ({
    components: { McTag },
    setup() {
      const handleClick = action("click");
      const handleClose = action("close");
      return { args, handleClick, handleClose };
    },
    template: `<mc-tag 
      v-bind="args" 
      @click="handleClick" 
      @close="handleClose">
      {{ args.default }}
    </mc-tag>`,
  }),
};
