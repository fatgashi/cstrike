import LayOut from "../Layout/Layout.vue";
import Home from "../views/Home.vue";
const Server = () =>  import("../views/Server.vue");
const Vip = () => import("../views/Vip.vue");
const Events = () => import("../views/Events.vue");
const Offers = () => import("../views/Offers.vue");
const Maps = () => import("../views/Maps.vue");
import About from "../views/About.vue";
const ProfileView = () => import("../views/ProfileView.vue");
const MediumMaps = () => import("../views/MediumMaps.vue");
const LargeMaps = () => import("../views/LargeMaps.vue");
const PlayerData = () => import("../views/PlayerData.vue");
const DashboardLayout = () => import("../DashboardLayout/DashboardLayout.vue");
const DashboardView = () => import("../Dashboard/DashboardView.vue");
const DashboardBanlist = () => import("../Dashboard/DashboardBanListView.vue");
const EmailVerification = () => import("../views/EmailVerification.vue");
const VerifyEmailView = () => import("../views/VerifyEmailView.vue");
const Forum = () => import("../views/Forum.vue");
const AdminApplications = () => import("../views/AdminApplications.vue");
const AdminApplicationDetails = () => import("../views/AdminApplicationDetails.vue");
const ApplyForAdmin = () => import("../views/ApplyForAdmin.vue");
const ForgotPassword = () => import("../views/ForgotPasswordView.vue");
const ResetPassword = () => import("../views/ResetPasswordView.vue");
const RulesView = () => import("../views/RulesView.vue");
const DashboardCommands = () => import("../Dashboard/DashboardCommand.vue");
const LevelRewards = () => import("../views/LevelRewards.vue");

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
            {
                path: "/forum",
                component: Forum
            },
            {
                path: "/forum/admin-applications",
                component: AdminApplications
            },
            {
                path: "/forum/rules",
                component: RulesView
            },
            {
                path: "/forum/apply-for-admin",
                component: ApplyForAdmin,
                meta: { requireClient: true }
            },
            {
                path: "/profile",
                component: ProfileView,
                meta: { requireAuthentication: true }
            },
            {
                path: "/level-rewards",
                component: LevelRewards
            },
            {
                path: "/forum/admin-applications/:id",
                component: AdminApplicationDetails,
                props: true
            },
            { path: '/email-verification', component: EmailVerification, meta: { requiresGuest: true } },
            { path: '/verify-email', component: VerifyEmailView, meta: { requiresGuest: true } },
            { path: "/forgot-password", component: ForgotPassword, meta: { requiresGuest: true } },
            { path: "/reset-password", component: ResetPassword, meta: { requiresGuest: true } }
        ]
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardLayout,
        redirect: "/dashboard/home",
        meta: {
            requireSuperAdmin: true
        },
        children: [
            {
                path: "/dashboard/home",
                name: "DashboardView",
                component: DashboardView
            },
            {
                path: "/dashboard/banlist",
                name: "DashboardBanlist",
                component: DashboardBanlist,
                meta: {
                    title: "Ban List"
                }
            },
            {
                path: "/dashboard/commands",
                name: "DashboardCommands",
                component: DashboardCommands,
                meta: {
                    title: "Command Page"
                }
            },

    ]
    },
    {
        path: "*",
        redirect: "/home"
    }
]

export default routers;