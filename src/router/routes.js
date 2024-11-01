
import LayOut from "../Layout/Layout.vue";
import Home from "../views/Home.vue";

const routers = [
    {
        path: "/",
        component: LayOut,
        redirect: "/home",
        children: [
            {
                path: "home",
                name: "Home",
                component: Home,
            },
        ]
    }
]

export default routers;