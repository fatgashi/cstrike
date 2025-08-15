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

// Auto-scroll to top on route change
router.afterEach(() => {
  // Use setTimeout to ensure DOM is fully updated
  setTimeout(() => {
    try {
      // Check if smooth scrolling is supported
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, 0);
      }
    } catch (error) {
      // Ultimate fallback - instant scroll
      window.scrollTo(0, 0);
    }
  }, 100); // Small delay to ensure route transition is complete
});

export default router;
