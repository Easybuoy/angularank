import axios from 'axios';

import { axiosWithAuth } from '../../utils';

const state = {
  userDetail: {},
  loading: false,
  error: null,
  repositories
};

const getters = {
  userDetail: currentState => currentState.userDetail,
  loading: currentState => currentState.loading,
  error: currentState => currentState.error,
  repositories: currentState => currentState.repositories
};

const actions = {
  async getUserDetail({ commit }, login) {
    commit('setLoading');
    axiosWithAuth()
      .get(`https://api.github.com/users/${login}`)
      .then(res => {
        commit('setUserDetail', res.data);
        commit('setLoading');

        console.log(res.data);
        axiosWithAuth()
          .get(res.data.repos_url)
          .then(response => {
            commit('setRepositories', response.data);
          })
          .catch(error => console.log(error));
      })
      .catch(err => {
        console.log(err);
        commit('setError', err);
      });
  }
};

const mutations = {
  setUserDetail: (state, userDetail) => (state.userDetail = userDetail),
  setLoading: state => (state.loading = !state.loading),
  setError: (state, error) => (state.error = error),
  setRepositories: (state, repositories) => (state.repositories = repositories)
};

export default {
  state,
  getters,
  actions,
  mutations
};
