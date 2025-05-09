import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { McButton } from "mc-plus";
import type { ButtonProps } from "mc-plus";

type Story = StoryObj<typeof McButton> & {
  argTypes: ArgTypes<typeof McButton>;
};

const meta: Meta<typeof McButton> = {
  title: "Button",
  component: McButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "plain", "link"],
      defaultValue: "primary",
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      defaultValue: "button",
    },
    size: {
      control: { type: "select" },
      options: ["medium", "large", "small"],
      defaultValue: "medium",
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
};

const container = (val: string) => `
  <div style="margin: 8px">
    ${val}
  </div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "MC Button",
  },
  render: (args: ButtonProps) => ({
    components: { McButton },
    setup() {
      return { args };
    },
    template: container(
      `<mc-button v-bind="args">{{ args.content }}</mc-button>`
    ),
  }),
};

export default meta;
