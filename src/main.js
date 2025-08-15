import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosInstace from './config/axios';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTrash,
  faArrowRight,
  faArrowLeft,
  faTerminal,
  faEllipsisH,
  faInfoCircle,
  faTrashAlt,
  faServer,
  faMap,
  faTrashCan,
  faTrophy,
  faGem,
  faHome,
  faUsers,
  // Dashboard icons
  faTachometerAlt,
  faBan,
  faSearch,
  faCrown,
  faShieldAlt,
  faCheck,
  faUserEdit,
  faTimes,
  faSave,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faUser,
  faSignOutAlt,
  faCog,
  faBars,
  faTimes as faTimesSolid,
  // Admin Application Details icons
  faUserShield,
  faSyncAlt,
  faLock,
  faFlag,
  faStar,
  faClock,
  faCalendarWeek,
  // faDiscord,
  faHeadset,
  faBook,
  faVoteYea,
  faPaperclip,
  faComments,
  faImage,
  faPaperPlane,
  faExclamationTriangle,
  // Forum icons
  faHandshake,
  faBookOpen,
  faGavel,
  faBullhorn,
  faNewspaper,
  faBell,
  faPlus,
  // Admin Applications icons
  faCheckCircle,
  faTimesCircle,
  faInbox,
  faThLarge,
  faList,
  // Apply For Admin icons
  faClipboardList,
  faTag,
  faBirthdayCake,
  faLanguage,
  faGamepad,
  faMicrophone,
  faCloudUploadAlt
} from '@fortawesome/free-solid-svg-icons'

import {
  faCalendarAlt,
  faCommentDots
} from '@fortawesome/free-regular-svg-icons'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/main.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


import { createMetaManager, defaultConfig } from 'vue-meta';

const app = createApp(App);

library.add(
  faEdit,
  faTrash,
  faArrowRight,
  faArrowLeft,
  faTerminal,
  faEllipsisH,
  faInfoCircle,
  faTrashAlt,
  faServer,
  faMap,
  faTrashCan,
  faTrophy,
  faGem,
  faHome,
  faUsers,
  // Dashboard icons
  faTachometerAlt,
  faBan,
  faSearch,
  faCrown,
  faShieldAlt,
  faCheck,
  faUserEdit,
  faTimes,
  faSave,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faUser,
  faSignOutAlt,
  faCog,
  faBars,
  faTimesSolid,
  // Admin Application Details icons
  faUserShield,
  faSyncAlt,
  faLock,
  faFlag,
  faStar,
  faClock,
  faCalendarWeek,
  // faDiscord,
  faHeadset,
  faBook,
  faVoteYea,
  faPaperclip,
  faComments,
  faImage,
  faPaperPlane,
  faExclamationTriangle,
  // Forum icons
  faHandshake,
  faBookOpen,
  faGavel,
  faBullhorn,
  faNewspaper,
  faBell,
  faPlus,
  // Admin Applications icons
  faCheckCircle,
  faTimesCircle,
  faInbox,
  faThLarge,
  faList,
  // Apply For Admin icons
  faClipboardList,
  faTag,
  faBirthdayCake,
  faLanguage,
  faGamepad,
  faMicrophone,
  faCloudUploadAlt,
  // Regular icons
  faCalendarAlt,
  faCommentDots,
  // Brand icons
  // faDiscord
);

dom.watch();
// 🔧 Plugins
app.use(router);
app.use(store);
app.use(Toast, {
  position: "top-right",
  timeout: 4000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
app.use(createMetaManager(false, defaultConfig)); // Replaces VueMeta

// 🔧 Global properties
app.config.globalProperties.$axios = AxiosInstace;

// 🚀 Mount
app.mount('#app');
