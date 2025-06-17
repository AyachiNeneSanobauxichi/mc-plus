import { createLightbox, McLightBox } from "@mc-plus/components";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

const meta: Meta<typeof McLightBox> = {
  title: "LightBox",
  component: McLightBox,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "boolean",
    },
    title: {
      control: { type: "text" },
    },
    content: {
      control: { type: "text" },
    },
    showClose: {
      control: "boolean",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    position: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
    },
    maskClosable: {
      control: "boolean",
    },
  },
  args: {
    modelValue: false,
    title: "Header here",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut lacus quis tellus maximus laoreet vitae ut nulla. Pellentesque nibh lectus, tincidunt et neque id, egestas laoreet nisl. Nam interdum non nisl posuere feugiat. Quisque ornare suscipit vestibulum. Quisque fringilla condimentum mollis. Nulla rhoncus dapibus quam, vestibulum condimentum lorem consectetur eu. Vestibulum in luctus purus, at eleifend enim. Aliquam erat volutpat. Phasellus vitae nulla sed ipsum commodo consequat eget non sapien. Nulla non quam blandit massa ullamcorper imperdiet. Phasellus placerat convallis metus. In lobortis velit ut magna pharetra, ac rhoncus dui commodo.",
    showClose: true,
    size: "medium",
    position: "center",
    maskClosable: true,
  },
};

export default meta;
type Story = StoryObj<typeof McLightBox>;

export const Default: Story = {
  args: {
    modelValue: false,
    title: "Header here",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut lacus quis tellus maximus laoreet vitae ut nulla. Pellentesque nibh lectus, tincidunt et neque id, egestas laoreet nisl. Nam interdum non nisl posuere feugiat. Quisque ornare suscipit vestibulum. Quisque fringilla condimentum mollis. Nulla rhoncus dapibus quam, vestibulum condimentum lorem consectetur eu. Vestibulum in luctus purus, at eleifend enim. Aliquam erat volutpat. Phasellus vitae nulla sed ipsum commodo consequat eget non sapien. Nulla non quam blandit massa ullamcorper imperdiet. Phasellus placerat convallis metus. In lobortis velit ut magna pharetra, ac rhoncus dui commodo.",
    showClose: true,
    size: "medium",
    position: "center",
    maskClosable: true,
  },
  render: (args: any) => ({
    components: { McLightBox },
    setup() {
      const visible = ref(args.modelValue);
      const handleClose = action("close");
      const handleUpdateModelValue = (value: boolean) => {
        visible.value = value;
        action("update:modelValue")(value);
      };

      const showLightbox = () => {
        visible.value = true;
      };

      return {
        args,
        visible,
        handleClose,
        handleUpdateModelValue,
        showLightbox,
      };
    },
    template: `
      <div style="padding: 20px;">
        <button 
          @click="showLightbox" 
          style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
        >
          Show LightBox
        </button>
        
        <mc-light-box 
          v-model="visible"
          v-bind="args" 
          @close="handleClose" 
          @update:modelValue="handleUpdateModelValue"
        />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { McLightBox },
    setup() {
      const smallVisible = ref(false);
      const mediumVisible = ref(false);
      const largeVisible = ref(false);
      const handleClose = action("close");

      return {
        smallVisible,
        mediumVisible,
        largeVisible,
        handleClose,
      };
    },
    template: `
      <div style="padding: 20px;">
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <button 
            @click="smallVisible = true" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Small (430x512)
          </button>
          <button 
            @click="mediumVisible = true" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Medium (800x512)
          </button>
          <button 
            @click="largeVisible = true" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Large (1024x700)
          </button>
        </div>
        
        <mc-light-box 
          v-model="smallVisible"
          title="Small LightBox"
          content="This is a small lightbox (430x512px)"
          size="small"
          @close="handleClose"
        />
        
        <mc-light-box 
          v-model="mediumVisible"
          title="Medium LightBox"
          content="This is a medium lightbox (800x512px)"
          size="medium"
          @close="handleClose"
        />
        
        <mc-light-box 
          v-model="largeVisible"
          title="Large LightBox"
          content="This is a large lightbox (1024x700px)"
          size="large"
          @close="handleClose"
        />
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: () => ({
    components: { McLightBox },
    setup() {
      const topVisible = ref(false);
      const centerVisible = ref(false);
      const bottomVisible = ref(false);
      const handleClose = action("close");

      return {
        topVisible,
        centerVisible,
        bottomVisible,
        handleClose,
      };
    },
    template: `
      <div style="padding: 20px;">
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <button 
            @click="topVisible = true" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Top Position
          </button>
          <button 
            @click="centerVisible = true" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Center Position
          </button>
          <button 
            @click="bottomVisible = true" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: radius: 6px; cursor: pointer;"
          >
            Bottom Position
          </button>
        </div>
        
        <mc-light-box 
          v-model="topVisible"
          title="Top Position"
          content="This lightbox is positioned at the top of the screen"
          position="top"
          @close="handleClose"
        />
        
        <mc-light-box 
          v-model="centerVisible"
          title="Center Position"
          content="This lightbox is positioned at the center of the screen"
          position="center"
          @close="handleClose"
        />
        
        <mc-light-box 
          v-model="bottomVisible"
          title="Bottom Position"
          content="This lightbox is positioned at the bottom of the screen"
          position="bottom"
          @close="handleClose"
        />
      </div>
    `,
  }),
};

export const WithCustomContent: Story = {
  args: {
    modelValue: false,
    title: "Custom Content",
    showClose: true,
    size: "large",
  },
  render: (args: any) => ({
    components: { McLightBox },
    setup() {
      const visible = ref(args.modelValue);
      const handleClose = action("close");
      const handleConfirm = () => {
        action("confirm")();
        visible.value = false;
      };

      const showLightbox = () => {
        visible.value = true;
      };

      return {
        args,
        visible,
        handleClose,
        handleConfirm,
        showLightbox,
      };
    },
    template: `
      <div style="padding: 20px;">
        <button 
          @click="showLightbox" 
          style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
        >
          Show Custom LightBox
        </button>
        
        <mc-light-box 
          v-model="visible"
          v-bind="args" 
          @close="handleClose"
        >
          <template #content>
            <div style="padding: 20px 0;">
              <h3 style="margin: 0 0 16px 0; color: #374151;">Custom Content Area</h3>
              <p style="margin: 0 0 16px 0; line-height: 1.6;">This is custom content inside the lightbox using the content slot.</p>
              <ul style="margin: 0 0 16px 0; padding-left: 20px;">
                <li>Feature 1: Advanced functionality</li>
                <li>Feature 2: Enhanced user experience</li>
                <li>Feature 3: Improved performance</li>
              </ul>
              <div style="background: #f3f4f6; padding: 16px; border-radius: 6px; margin: 16px 0;">
                <strong>Note:</strong> You can put any content here including forms, images, or complex layouts.
              </div>
            </div>
          </template>
          
          <template #footer>
            <div style="display: flex; gap: 12px;">
              <button 
                @click="visible = false"
                style="padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; background: transparent; color: #374151; border: 1px solid #d1d5db;"
              >
                Cancel
              </button>
              <button 
                @click="handleConfirm"
                style="padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; background: #14b8a6; color: white; border: 1px solid transparent;"
              >
                Confirm
              </button>
            </div>
          </template>
        </mc-light-box>
      </div>
    `,
  }),
};

export const MaskClosable: Story = {
  render: () => ({
    components: { McLightBox },
    setup() {
      const closableVisible = ref(false);
      const nonClosableVisible = ref(false);
      const handleClose = action("close");

      return {
        closableVisible,
        nonClosableVisible,
        handleClose,
      };
    },
    template: `
      <div style="padding: 20px;">
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <button 
            @click="closableVisible = true" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Mask Closable (Default)
          </button>
          <button 
            @click="nonClosableVisible = true" 
            style="padding: 10px 20px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Mask Not Closable
          </button>
        </div>
        
        <mc-light-box 
          v-model="closableVisible"
          title="Mask Closable"
          content="Click on the mask (dark area) to close this lightbox"
          :mask-closable="true"
          @close="handleClose"
        />
        
        <mc-light-box 
          v-model="nonClosableVisible"
          title="Mask Not Closable"
          content="Clicking on the mask will not close this lightbox. Use the X button to close."
          :mask-closable="false"
          @close="handleClose"
        />
      </div>
    `,
  }),
};

export const FunctionalUsage: Story = {
  render: () => ({
    setup() {
      const showBasicLightbox = () => {
        createLightbox({
          title: "Functional LightBox",
          content: "This lightbox was created using the createLightbox function!",
          size: "medium",
          position: "center",
          onClose: () => {
            action("close")();
          },
        });
      };

      const showCustomLightbox = () => {
        createLightbox({
          title: "Custom Functional LightBox",
          content: "This is a small lightbox positioned at the top, and mask is not closable.",
          size: "small",
          position: "top",
          maskClosable: false,
          onClose: () => {
            action("close")();
          },
        });
      };

      return { showBasicLightbox, showCustomLightbox };
    },
    template: `
      <div style="padding: 20px;">
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <button 
            @click="showBasicLightbox" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Basic Functional LightBox
          </button>
          <button 
            @click="showCustomLightbox" 
            style="padding: 10px 20px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;"
          >
            Custom Functional LightBox
          </button>
        </div>
        <p style="margin-top: 10px; color: #666; font-size: 14px;">
          Note: Functional usage doesn't use v-model, it creates and manages its own instance.
        </p>
      </div>
    `,
  }),
};
