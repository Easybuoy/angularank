import Vue from 'vue';
import Vuex from 'vuex';
import contributors from './modules/contributors';
import user from './modules/user';
import repository from './modules/repository';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { loading: false, error: null },
  mutations: {
    setLoading: (state) => (state.loading = !state.loading),
    setError: (state, error) => (state.error = error),
  },
  actions: {},
  getters: {
    loading: (currentState) => currentState.loading,
    error: (currentState) => currentState.error,
  },
  modules: {
    contributors,
    user,
    repository,
  },
});
