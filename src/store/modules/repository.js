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
      .get(`https://api.github.com/repos/${login}/${repoName}/contributors?per_page=100`)
      .then(res => {
        console.log(res);
        commit('setContributors', res.data)
        //
        // axiosWithAuth()
        //   .get(`${res.data.repos_url}?per_page=100`)
        //   .then(response => {
        //     console.log(response.data);
        //     commit('setRepositories', response.data);
        //   })
        //   .catch(error => console.log(error));
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
