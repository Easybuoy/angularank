import { axiosWithAuth } from '../../utils';

const state = {
  userDetail: {},
  repositories: []
};

const getters = {
  userDetail: currentState => currentState.userDetail,
  repositories: currentState => currentState.repositories
};

const actions = {
  async getUserDetail({ commit }, login) {
    commit('setLoading');
    axiosWithAuth()
      .get(`https://api.github.com/users/${login}`)
      .then(res => {
        commit('setUserDetail', res.data);

        console.log(res.data);
        axiosWithAuth()
          .get(`${res.data.repos_url}?per_page=100`)
          .then(response => {
            console.log(response.data);
            commit('setRepositories', response.data);
            commit('setLoading');
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
  setRepositories: (state, repositories) => (state.repositories = repositories)
};

export default {
  state,
  getters,
  actions,
  mutations
};
