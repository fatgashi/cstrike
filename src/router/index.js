import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import { getCurrentUser, isClient, isSuperAdmin } from "../config/userLogic.js"; // Import user check

Vue.use(VueRouter);

export const eventBus = new Vue();

const router = new VueRouter({
    mode: "history",
    routes: routes,
});

router.beforeEach(async (to, from, next) => {
    try {
        // Check if the route requires Super Admin access
        if (to.matched.some((record) => record.meta.requireSuperAdmin)) {
            const adminStatus = await isSuperAdmin();
            if (adminStatus === true) {
                return next(); // Allow access for superadmin
            } else {
                return next("/home"); // Redirect non-superadmin users
            }
        }

        // Check if the route requires Client access
        if (to.matched.some((record) => record.meta.requireClient)) {
            const clientStatus = await isClient();
            if (clientStatus === 'client') {
                return next();
            }
            else if(clientStatus === 'admin') {
                return next("/home");
            }
            else if(clientStatus === 'superadmin') {
                return next("/home");
            }
             else {
                eventBus.$emit("showLoginModal");
                return next();
            }
        }

        // Check if the route requires Authentication
        if (to.matched.some((record) => record.meta.requireAuthentication)) {
            const authenticated = await getCurrentUser();
            if (authenticated) {
                return next();
            } else {
                return next("/home");
            }
        }

        // Prevent logged-in users from accessing guest-only routes
        if (to.matched.some((record) => record.meta.requiresGuest)) {
            const user = await getCurrentUser();
            if (user) {
                return next("/home");
            } else {
                return next();
            }
        }

        // Default case: continue to the route
        return next();
    } catch (error) {
        console.error("Error in beforeEach guard:", error);
        return next("/home"); // Redirect to home if any error occurs
    }
});

export default router;
