import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import { isAdmin, getCurrentUser } from "../config/userLogic.js"; // Import user check

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: routes,
});

router.beforeEach(async (to, from, next) => {
    // Check if the route requires admin access
    if (to.matched.some((record) => record.meta.requireAdmin)) {
        const adminStatus = await isAdmin();
        if (adminStatus === true) {
            next(); // Allow access for admin
        } else {
            next("/home"); // Redirect non-admin users
        }
    }
    // Prevent logged-in users from accessing guest-only routes
    else if (to.matched.some((record) => record.meta.requiresGuest)) {
        const user = await getCurrentUser();
        if (user) {
            next("/home"); // Redirect logged-in users to dashboard
        } else {
            next(); // Allow access for guests
        }
    } 
    else {
        next(); // Continue for unrestricted routes
    }
});

export default router;
