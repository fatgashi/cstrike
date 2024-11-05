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

Vue.use(Toast);
Vue.use(BootstrapVue)
Vue.prototype.$axios = AxiosInstace;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
