import { axiosWithAuth } from '../../utils';

const state = {
  repoDetail: {},
  //   loading: false,
  //   error: null,
  contributors: []
};

const getters = {
  repoDetail: currentState => currentState.repoDetail,
  //   loading: currentState => currentState.loading,
  //   error: currentState => currentState.error,
  contributors: currentState => currentState.contributors
};

const actions = {
  async getRepoDetail({ commit }, params) {
    const { login, repoName } = params;
    commit('setLoading');
    axiosWithAuth()
      .get(`https://api.github.com/repos/${login}/${repoName}`)
      .then(res => {
        console.log(res.data);
        commit('setRepoDetail', res.data);
        axiosWithAuth()
          .get(`https://api.github.com/repos/${login}/${repoName}/contributors?per_page=100`)
          .then(response => {
            const sortedContributors = response.data.sort(
              (a, b) => b.contributions - a.contributions
            );
            commit('setContributors', sortedContributors);
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
  setRepoDetail: (state, repoDetail) => (state.repoDetail = repoDetail),
  //   setLoading: state => (state.loading = !state.loading),
  //   setError: (state, error) => (state.error = error),
  setContributors: (state, contributors) => (state.contributors = contributors)
};

export default {
  state,
  getters,
  actions,
  mutations
};
