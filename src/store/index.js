import Vue from 'vue';
import Vuex from 'vuex';
import organization from './modules/organization';
import user from './modules/user';
import repository from './modules/repository';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    organization,
    user,
    repository,
  },
});
