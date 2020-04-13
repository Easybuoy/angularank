import axios from 'axios';

import { formatURL, extractURL, fetchURL } from '../../utils';

const state = {
  userDetail: {},
  loading: false,
  error: null
};

const getters = {
  userDetail: currentState => currentState.userDetail,
  loading: currentState => currentState.loading,
  error: currentState => currentState.error,
};

const actions = {
  async getUserDetail({ commit }, login) {
    commit('setLoading');
    axios
      .get(`https://api.github.com/users/${login}`)
      .then(res => {
        // commit('setLoading');
        // commit('setUserDetail', res.data);
      })
      .catch(err => console.log(err));
  }
};

const mutations = {
  setUserDetail: (state, userDetail) => (state.userDetail = userDetail),
  setLoading: state => (state.loading = !state.loading),
  setError: (state, error) => (state.error = error)
};

export default {
  state,
  getters,
  actions,
  mutations
};
