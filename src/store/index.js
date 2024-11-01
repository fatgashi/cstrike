import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answers: [], // Store user answers here
    bmi: 0,
    currentLang: localStorage.getItem('currentLang') || 'en',
    dietType: "",
    logged: false,
    token: null,
  },
  plugins: [
    createPersistedState({
      paths: ['answers', 'bmi', 'currentLang', 'dietType', "token", "logged"], // Specify which state properties to persist
    }),
  ],
})
