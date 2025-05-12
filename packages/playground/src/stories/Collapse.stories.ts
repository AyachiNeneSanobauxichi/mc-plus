import type { Meta, StoryObj } from "@storybook/vue3";
import { McCollapse, McCollapseItem } from "mc-plus";

type Story = StoryObj<typeof McCollapse>;

const meta: Meta<typeof McCollapse> = {
  title: "Collapse",
  component: McCollapse,
  subcomponents: { McCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      McCollapse,
      McCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <mc-collapse v-bind="args">
      <mc-collapse-item name="yui" title="Yui">
        <div>I am Hirasawa Yui</div>
      </mc-collapse-item>
      <mc-collapse-item name="mio" title="Mio">
        <div>I am Akiyama Mio</div>
      </mc-collapse-item>
      <mc-collapse-item name="azusa" title="Azusa">
        <div>I am Nakano Azusa</div>
      </mc-collapse-item>
      <mc-collapse-item name="ritsu" title="Ritsu">
        <div>I am Tainaka Ritsu</div>
      </mc-collapse-item>
      <mc-collapse-item name="mugi" title="Tsumugi">
        <div>I am Kotobuku Tsumugi</div>
      </mc-collapse-item>
    </mc-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["yui"],
  },
};

export default meta;
