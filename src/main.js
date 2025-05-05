import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosInstace from './config/axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import VueApexCharts from 'vue3-apexcharts';
import { createMetaManager, defaultConfig } from 'vue-meta';

const app = createApp(App);

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
app.use(VueApexCharts);
app.use(createMetaManager(false, defaultConfig)); // Replaces VueMeta

// 🔧 Global components
app.component('ApexChart', VueApexCharts);

// 🔧 Global properties
app.config.globalProperties.$axios = AxiosInstace;

// 🚀 Mount
app.mount('#app');
