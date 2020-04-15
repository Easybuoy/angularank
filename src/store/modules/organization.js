// import axios from 'axios';
import { axiosWithAuth } from '../../utils';

import {
  formatURL,
  extractURL,
  fetchURL,
  getItemFromLocalStorage,
  addDataToLocalStorage,
  getContributorsDetail
} from '../../utils';

const state = {
  organizations: []
};

const getters = {
  allOrganizations: currentState => currentState.organizations
};

const actions = {
  async getOrganizations({ commit }) {
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
        .then(data => {
          data.forEach(item => {
            contributorsData = contributorsData.concat(item.data);
            if (item.headers.link) {
              const formattedURL = formatURL(item.headers.link, item.config.url);
              remainingContributorsListURL = remainingContributorsListURL.concat(formattedURL);
            }
          });
          const secondPromiseArray = contributorsUrl.map(fetchURL);

          Promise.all(secondPromiseArray)
            .then(resp => {
              resp.forEach(item => {
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
  }
};

const mutations = {
  setOrganizations: (state, organizations) => (state.organizations = organizations)
};

export default {
  state,
  getters,
  actions,
  mutations
};
