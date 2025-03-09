import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
// import store from "../store/index.js";
import { isAdmin } from "../config/userLogic.js";

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAdmin)) {
      const adminStatus = await isAdmin();
  
      if (adminStatus === true) {
        next(); // Allow access
      } else {
        next("/home"); // Redirect non-admin users
      }
    } else {
      next(); // Continue to route if not restricted
    }
  });


export default router;