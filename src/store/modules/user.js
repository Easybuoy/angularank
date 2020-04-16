import { axiosWithAuth } from '../../utils';

const state = {
  userDetail: {},
  repositories: [],
};

const getters = {
  userDetail: (currentState) => currentState.userDetail,
  repositories: (currentState) => currentState.repositories,
};

const actions = {
  async getUserDetail({ commit }, login) {
    commit('setLoading');
    axiosWithAuth()
      .get(`https://api.github.com/users/${login}`)
      .then((res) => {
        commit('setUserDetail', res.data);

        axiosWithAuth()
          .get(`${res.data.repos_url}?per_page=100`)
          .then((response) => {
            commit('setRepositories', response.data);
            commit('setLoading');
          })
          .catch(() => {
            commit('setError', 'Error loading user detail');
            commit('setLoading');
          });
      })
      .catch(() => {
        commit('setError', 'Error loading user detail');
        commit('setLoading');
      });
  },
};

const mutations = {
  setUserDetail: (state, userDetail) => (state.userDetail = userDetail),
  setRepositories: (state, repositories) => (state.repositories = repositories),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
