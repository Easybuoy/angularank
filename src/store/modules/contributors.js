import {
  axiosWithAuth,
  formatURL,
  extractURL,
  fetchURL,
  getItemFromLocalStorage,
  addDataToLocalStorage,
  getContributorsDetail,
  paginateTotalPage,
} from '../../utils';

const state = {
  contributors: [],
  paginatedContributors: [],
  sortByContributorsArrow: '',
  sortByFollowersArrow: '',
  sortByGistsArrow: '',
  sortByRepositoryArrow: '',
  selectedPage: 1,
};

const getters = {
  allContributors: (currentState) => currentState.contributors,
  paginatedContributors: (currentState) => currentState.paginatedContributors,
  sortByContributorsArrow: (currentState) => currentState.sortByContributorsArrow,
  sortByGistsArrow: (currentState) => currentState.sortByGistsArrow,
  sortByRepositoryArrow: (currentState) => currentState.sortByRepositoryArrow,
  sortByFollowersArrow: (currentState) => currentState.sortByFollowersArrow,
  selectedPage: (currentState) => currentState.selectedPage,
};

const actions = {
  async getContributors({ commit }) {
    commit('setLoading');
    const contributors = getItemFromLocalStorage('contributorsData', 'contributors');

    if (contributors === null) {
      let contributorsUrl = [];
      const response = await axiosWithAuth().get(
        'https://api.github.com/orgs/angular/repos?per_page=100&page=1'
      );
      contributorsUrl = contributorsUrl.concat(extractURL(response.data, 'contributors_url'));

      const response2 = await axiosWithAuth().get(
        'https://api.github.com/orgs/angular/repos?per_page=100&page=2'
      );
      contributorsUrl = contributorsUrl.concat(extractURL(response2.data, 'contributors_url'));
      const promiseArray = contributorsUrl.map(fetchURL);
      let contributorsData = [];
      let remainingContributorsListURL = [];
      Promise.all(promiseArray)
        .then((data) => {
          data.forEach((item) => {
            contributorsData = contributorsData.concat(item.data);
            if (item.headers.link) {
              const formattedURL = formatURL(item.headers.link, item.config.url);
              remainingContributorsListURL = remainingContributorsListURL.concat(formattedURL);
            }
          });
          const secondPromiseArray = contributorsUrl.map(fetchURL);

          Promise.all(secondPromiseArray)
            .then((resp) => {
              resp.forEach((item) => {
                contributorsData = contributorsData.concat(item.data);
              });
              addDataToLocalStorage(contributorsData, 'contributorsData', 'contributors');
              getContributorsDetail(commit, contributorsData);
            })
            .catch(() => {
              commit('setError', 'Error loading contributor details');
              commit('setLoading');
            });
        })
        .catch(() => {
          commit('setError', 'Error loading contributor details');
          commit('setLoading');
        });
    } else {
      getContributorsDetail(commit, contributors);
    }
  },
  sortByContributors({ commit }) {
    if (
      state.sortByContributorsArrow === ''
      || state.sortByContributorsArrow === 'mdi-arrow-down'
    ) {
      const sortedContributors = state.contributors.sort(
        (a, b) => b.contributions - a.contributions
      );

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setsortByGistsArrow', '');
      commit('setSortByFollowersArrow', '');
      commit('setSortByRepositoryArrow', '');
      commit('setSortByContributorsArrow', 'mdi-arrow-up');
    } else {
      const sortedContributors = state.contributors.sort(
        (a, b) => a.contributions - b.contributions
      );

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setsortByGistsArrow', '');
      commit('setSortByFollowersArrow', '');
      commit('setSortByRepositoryArrow', '');
      commit('setSortByContributorsArrow', 'mdi-arrow-down');
    }
  },
  sortByGists({ commit }) {
    if (state.sortByGistsArrow === '' || state.sortByGistsArrow === 'mdi-arrow-down') {
      const sortedContributors = state.contributors.sort((a, b) => b.public_gists - a.public_gists);

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setSortByContributorsArrow', '');
      commit('setSortByFollowersArrow', '');
      commit('setSortByRepositoryArrow', '');
      commit('setsortByGistsArrow', 'mdi-arrow-up');
    } else {
      const sortedContributors = state.contributors.sort((a, b) => a.public_gists - b.public_gists);

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setSortByContributorsArrow', '');
      commit('setSortByFollowersArrow', '');
      commit('setSortByRepositoryArrow', '');
      commit('setsortByGistsArrow', 'mdi-arrow-down');
    }
  },
  sortByFollowers({ commit }) {
    if (state.sortByFollowersArrow === '' || state.sortByFollowersArrow === 'mdi-arrow-down') {
      const sortedContributors = state.contributors.sort((a, b) => b.followers - a.followers);

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setsortByGistsArrow', '');
      commit('setSortByContributorsArrow', '');
      commit('setSortByRepositoryArrow', '');
      commit('setSortByFollowersArrow', 'mdi-arrow-up');
    } else {
      const sortedContributors = state.contributors.sort((a, b) => a.followers - b.followers);

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setsortByGistsArrow', '');
      commit('setSortByContributorsArrow', '');
      commit('setSortByRepositoryArrow', '');
      commit('setSortByFollowersArrow', 'mdi-arrow-down');
    }
  },
  sortByRepository({ commit }) {
    if (state.sortByRepositoryArrow === '' || state.sortByRepositoryArrow === 'mdi-arrow-down') {
      const sortedContributors = state.contributors.sort((a, b) => b.public_repos - a.public_repos);

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setsortByGistsArrow', '');
      commit('setSortByContributorsArrow', '');
      commit('setSortByFollowersArrow', '');
      commit('setSortByRepositoryArrow', 'mdi-arrow-up');
    } else {
      const sortedContributors = state.contributors.sort((a, b) => a.public_repos - b.public_repos);

      const paginatedContributors = paginateTotalPage(sortedContributors, state.selectedPage);
      commit('setPaginatedContributors', paginatedContributors);
      commit('setsortByGistsArrow', '');
      commit('setSortByContributorsArrow', '');
      commit('setSortByFollowersArrow', '');
      commit('setSortByRepositoryArrow', 'mdi-arrow-down');
    }
  },
  paginateContributors({ commit }, newPage) {
    const paginatedContributors = paginateTotalPage(state.contributors, newPage);
    commit('setPaginatedContributors', paginatedContributors);
  },
  selectPage({ commit }, page) {
    commit('setSelectedPage', page);
  },
};

const mutations = {
  setContributors: (state, contributors) => (state.contributors = contributors),
  setPaginatedContributors: (state, paginatedContributors) => (state.paginatedContributors = paginatedContributors),
  setSortByContributorsArrow: (state, sortByContributorsArrow) => (state.sortByContributorsArrow = sortByContributorsArrow),
  setsortByGistsArrow: (state, sortByGistsArrow) => (state.sortByGistsArrow = sortByGistsArrow),
  setSortByFollowersArrow: (state, sortByFollowersArrow) => (state.sortByFollowersArrow = sortByFollowersArrow),
  setSortByRepositoryArrow: (state, sortByRepositoryArrow) => (state.sortByRepositoryArrow = sortByRepositoryArrow),
  setSelectedPage: (state, selectedPage) => (state.selectedPage = selectedPage),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
