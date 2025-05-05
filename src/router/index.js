import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';
import { getCurrentUser, isClient, isSuperAdmin } from '../config/userLogic.js';

// Optional: Event bus replacement for Vue 3
import mitt from 'mitt';
export const eventBus = mitt();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    if (to.matched.some(record => record.meta.requireSuperAdmin)) {
      const adminStatus = await isSuperAdmin();
      if (adminStatus === true) return next();
      return next("/home");
    }

    if (to.matched.some(record => record.meta.requireClient)) {
      const clientStatus = await isClient();
      if (clientStatus === 'client') return next();
      return next("/home");
    }

    if (to.matched.some(record => record.meta.requireAuthentication)) {
      const authenticated = await getCurrentUser();
      if (authenticated) return next();
      return next("/home");
    }

    if (to.matched.some(record => record.meta.requiresGuest)) {
      const user = await getCurrentUser();
      if (user) return next("/home");
      return next();
    }

    return next();
  } catch (error) {
    console.error("Error in beforeEach guard:", error);
    return next("/home");
  }
});

export default router;
