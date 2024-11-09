import LayOut from "../Layout/Layout.vue";
import Home from "../views/Home.vue";
import Server from "../views/Server.vue";
import Vip from "../views/Vip.vue";
import Events from "../views/Events.vue";

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
            },
            {
                path: "vip-info",
                name: "VipInfo",
                component: Vip
            },
            {
                path: "events-updates",
                name: "Events",
                component: Events
            }
        ]
    },
    {
        path: "*",
        redirect: "/home"
    }
]

export default routers;