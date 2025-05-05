import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
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
      state.user = user;
    },
    clearToken(state) {
      state.token = null;
      state.logged = false;
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
      commit('setUser', user);
    },
    clearToken({ commit }) {
      commit('clearToken');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
  plugins: [
    createPersistedState({
      paths: ['token', 'logged', 'user'],
    }),
  ],
});
