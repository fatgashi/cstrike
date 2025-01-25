import LayOut from "../Layout/Layout.vue";
import Home from "../views/Home.vue";
const Server = () =>  import("../views/Server.vue");
const Vip = () => import("../views/Vip.vue");
const Events = () => import("../views/Events.vue");
const Offers = () => import("../views/Offers.vue");
const Maps = () => import("../views/Maps.vue");
import About from "../views/About.vue";
const MediumMaps = () => import("../views/MediumMaps.vue");
const LargeMaps = () => import("../views/LargeMaps.vue");
const PlayerData = () => import("../views/PlayerData.vue");

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
            },
            {
                path: "offers",
                name: "Offers",
                component: Offers
            },
            {
                path: "maps",
                name: "Maps",
                component: Maps
            },
            {
                path: "medium-maps",
                name: "MediumMaps",
                component: MediumMaps
            },
            {
                path: "large-maps",
                name: "LargeMaps",
                component: LargeMaps
            },
            {
                path: "about",
                name: "About",
                component: About
            },
            {
                path: '/player/:playerName',
                name: 'PlayerDetails',
                component: PlayerData,
                props: true,
            },
        ]
    },
    {
        path: "*",
        redirect: "/home"
    }
]

export default routers;