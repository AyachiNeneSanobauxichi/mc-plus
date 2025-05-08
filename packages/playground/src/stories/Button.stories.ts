import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn } from "@storybook/test";
import { McButton } from "mc-plus";

type Story = StoryObj<typeof McButton> & { argTypes: ArgTypes };

const meta: Meta<typeof McButton> = {
  title: "Button",
  component: McButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info"],
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
  render: (args: { type: string; content: string }) => ({
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
