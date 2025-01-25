import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosInstace from './config/axios';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { getToken } from './config/localStorage.js';
import { getTokenExpiration, logout } from './config/userLogic.js';
import VueApexCharts from 'vue-apexcharts'

Vue.use(Toast);
Vue.use(BootstrapVue)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.prototype.$axios = AxiosInstace;

Vue.prototype.$setupSessionTimeout = function(){
  const token = getToken();
  if (token) {
      const expiresAt = getTokenExpiration(token);
      const timeout = expiresAt - Date.now();

      if (timeout > 0) {
          setTimeout(() => {
              logout();
          }, timeout);
      } else {
          logout();
      }
  }
};

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
    this.$setupSessionTimeout();
  },
  render: h => h(App),
}).$mount('#app')
