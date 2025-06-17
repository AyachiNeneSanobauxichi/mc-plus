<!--
 * @Author: Tieju yang
 * @Date: 2025-05-22 11:00:45
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 11:01:04
-->
<template>
  <div class="demo-section">
    <h3>Button Component</h3>
    <div class="demo-block">
      <mc-button type="primary" @click="handleClick">Primary Button</mc-button>
      <mc-button type="plain" @click="handleClick">Plain Button</mc-button>
      <mc-button type="link" @click="handleClick">Link Button</mc-button>
      <mc-button type="primary" disabled @click="handleClick">Disabled Button</mc-button>
      <mc-button type="primary" loading @click="handleClick">Loading Button</mc-button>
      <mc-button type="primary" size="small" @click="handleClick">Small Button</mc-button>
      <mc-button type="primary" size="large" @click="handleClick">Large Button</mc-button>
      <mc-button type="primary" leftIcon="Add" @click="handleClick">With Left Icon</mc-button>
      <mc-button type="primary" rightIcon="Right" @click="handleClick">With Right Icon</mc-button>
    </div>
  </div>
  <mc-lightbox v-model="visible" title="Light Box" @close="handleClose" size="large" position="top" :maskClosable="false">
    <template #content>
      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>

      <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, soluta! Dolore veritatis unde odit nisi expedita magnam iusto nemo architecto quidem quam deserunt culpa, sed debitis saepe provident dolorem aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>
    </template>

    <template #footer>
      <mc-button type="primary" @click="handleClick2">Confirm</mc-button>
    </template>
  </mc-lightbox>

  <mc-lightbox v-model="visible2" title="Light Box" @close="handleClose2" size="small" position="top" :maskClosable="false">
    <template #content>
      <div>em aspernatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, possimus iusto? Voluptatum blanditiis rem dolor quos ab nulla, animi perferendis quam voluptas quisquam officia porro exercitationem nostrum? Itaque, sit dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque, blanditiis iusto sunt saepe fugiat possimus molestias alias minus numquam! Dolore aliquid minima expedita obcaecati consequuntur voluptatibus accusantium ex voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos ab sequi nulla doloremque dignissimos vel! Rerum repudiandae illo tenetur asperiores eum, adipisci perspiciatis voluptates quis necessitatibus aperiam possimus mollitia.</div>
    </template>
  </mc-lightbox>
</template>

<script setup lang="ts">
import { McButton } from "mc-plus";
import { ref } from "vue";
import { McLightbox } from "../../../components";

const visible = ref(false);
const visible2 = ref(false);

const handleClick = () => {
  visible.value = true;
  console.log("Button clicked");
};

const handleClose = () => {
  console.log("Light Box closed");
};

const handleClick2 = () => {
  visible2.value = true;
  console.log("Button clicked");
};

const handleClose2 = () => {
  visible2.value = false;
  console.log("Light Box closed");
};
</script>

<style scoped lang="scss">
.demo-section {
  margin-bottom: 32px;
}

.demo-block {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}
</style>
