import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

// create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router guard
router.beforeEach((to, _, next) => {
  // set page title
  if (to.meta?.title) {
    document.title = `${to.meta.title} - MC Plus Playground`;
  }
  next();
});

export default router;
