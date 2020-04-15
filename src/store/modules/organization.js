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
      const response = await axiosWithAuth.get(
        'https://api.github.com/orgs/angular/repos?per_page=100&page=1',
      );
      contributorsUrl = contributorsUrl.concat(extractURL(response.data, 'contributors_url'));

      const response2 = await axiosWithAuth.get(
        'https://api.github.com/orgs/angular/repos?per_page=100&page=2',

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
            .catch(() => commit('setError', 'Error geting contributor details'));
        })
        .catch(() => commit('setError', 'Error geting contributor details'));
    } else {
      getContributorsDetail(commit, contributors);
    }
  },
  async getOrganizationss({ commit }) {
    const contributors = JSON.parse(localStorage.getItem('contributors'));
    console.log(contributors);
    console.log(contributors.length);

    let groupedContributors = [];

    contributors.forEach(function(o) {
      if (!this[o.login]) {
        this[o.login] = { ...o, contributions: 0 };
        groupedContributors.push(this[o.login]);
      }
      this[o.login].contributions += o.contributions;
    }, Object.create(null));

    groupedContributors = groupedContributors
      .filter(item => item.url !== undefined)
      .sort((a, b) => b.contributions - a.contributions);
    console.log(groupedContributors, 'gg');
    const extractedUserUrl = extractURL(groupedContributors, 'url');

    commit('setOrganizations', groupedContributors);
    const promiseArray = extractedUserUrl.map(fetchURL);
    const notFound = [];
    axiosWithAuth
      .all(
        promiseArray.map(p =>
          p.catch(error => {
            notFound.push(error.response.config.url);
            return {};
          })
        )
      )
      .then(data => {
        const filteredData = groupedContributors.filter(item => {
          if (item && notFound.indexOf(item.url) === -1) {
            return item;
          }
        });
        console.log(data, 'ffff');

        data.forEach((item, i) => {
          if (item.data.login && filteredData[i].login) {
            if (item.data.login == filteredData[i].login) {
              filteredData[i].followers = item.data.followers;
              filteredData[i].public_repos = item.data.public_repos;
              filteredData[i].public_gists = item.data.public_gists;
            }
          }
        });
        console.log(filteredData);
        localStorage.setItem('updatedContributorsData', JSON.stringify(filteredData));
        commit('setOrganizations', filteredData);
        return filteredData;
      });
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
