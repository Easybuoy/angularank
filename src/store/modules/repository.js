import { axiosWithAuth } from '../../utils';

const state = {
  repoDetail: {},
  contributors: [],
};

const getters = {
  repoDetail: (currentState) => currentState.repoDetail,
  contributors: (currentState) => currentState.contributors,
};

const actions = {
  async getRepoDetail({ commit }, params) {
    const { login, repoName } = params;
    commit('setLoading');
    axiosWithAuth()
      .get(`https://api.github.com/repos/${login}/${repoName}`)
      .then((res) => {
        commit('setRepoDetail', res.data);
        axiosWithAuth()
          .get(`https://api.github.com/repos/${login}/${repoName}/contributors?per_page=100`)
          .then((response) => {
            const sortedContributors = response.data.sort(
              (a, b) => b.contributions - a.contributions
            );
            commit('setContributors', sortedContributors);
            commit('setLoading');
          })
          .catch(() => {
            commit('setError', 'Error geting details');
            commit('setLoading');
          });
      })
      .catch(() => {
        commit('setError', 'Error geting details');
        commit('setLoading');
      });
  },
};

const mutations = {
  setRepoDetail: (state, repoDetail) => (state.repoDetail = repoDetail),
  setContributors: (state, contributors) => (state.contributors = contributors),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
