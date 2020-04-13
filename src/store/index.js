import Vue from 'vue';
import Vuex from 'vuex';
import organization from './modules/organization';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    organization,
  },
});
