
import LayOut from "../Layout/Layout.vue";
import Home from "../views/Home.vue";
import Server from "../views/Server.vue";

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
            {
                path: "server",
                name: "Server",
                component: Server
            }
        ]
    }
]

export default routers;