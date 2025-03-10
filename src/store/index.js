import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    token: null,
    user: null,
  },
  mutations: {
    setLogged(state, value) {
      state.logged = value;
    },
    setToken(state, value) {
      state.token = value;
    },
    setUser(state, user) {
      state.user = user; // Set the user object
    },
    clearToken(state) {
      state.token = null; // Sets token to null
      state.logged = false; // Optional: Reset logged status if needed
      state.user = null;
    },
  },
  actions: {
    updateLogged({ commit }, value) {
      commit('setLogged', value);
    },
    updateToken({ commit }, value) {
      commit('setToken', value);
    },
    updateUser({ commit }, user) {
      commit('setUser', user); // Action to update the user data
    },
    clearToken({ commit }) {
      commit('clearToken'); // Calls the mutation to clear token
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return !!state.token;
    },
    getUser: (state) => {
      return state.user; // Getter to access the user object
    },
  },
  plugins: [
    createPersistedState({
      paths: ["token", "logged"], // Specify which state properties to persist
    }),
  ],
})
