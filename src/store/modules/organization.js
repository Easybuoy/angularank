import axios from 'axios';

import { formatURL, extractURL, fetchURL, getItemFromLocalStorage, addDataToLocalStorage } from '../../utils';

const state = {
  organizations: []
};

const getters = {
  allOrganizations: currentState => currentState.organizations
};

const actions = {
  async getOrganizations({ commit }) {
    const contributors = getItemFromLocalStorage('contributorsData', 'contributors')
    console.log(contributors, '==')
    if (contributors === null) {
      let contributorsUrl = [];
      const response = await axios.get(
        'https://api.github.com/orgs/angular/repos?per_page=100&page=1',
        {
          headers: { Authorization: 'Token 097de95c321b3d1042695472de58c2c1fa32e3ac ' }
        }
      );
      contributorsUrl = contributorsUrl.concat(extractURL(response.data, 'contributors_url'));
      console.log(contributorsUrl);
  
      const response2 = await axios.get(
        'https://api.github.com/orgs/angular/repos?per_page=100&page=2',
        {
          headers: { Authorization: 'Token 097de95c321b3d1042695472de58c2c1fa32e3ac ' }
        }
      );
      contributorsUrl = contributorsUrl.concat(extractURL(response2.data, 'contributors_url'));
      console.log(contributorsUrl);
      localStorage.setItem('contributorsUrl', JSON.stringify(contributorsUrl));
      console.log(contributorsUrl.length);

      const promiseArray = contributorsUrl.map(fetchURL);
    let contributorsData = [];
    let remainingContributorsListURL = [];
    Promise.all(promiseArray)
      .then(data => {
        data.forEach(item => {
          console.log(data, 'adasda');
          contributorsData = contributorsData.concat(item.data);
          if (item.headers.link) {
            const formattedURL = formatURL(item.headers.link, item.config.url);
            remainingContributorsListURL = remainingContributorsListURL.concat(formattedURL);
          }
        });

        console.log(contributorsData, 'contribData');
        console.log(contributorsData.length, 'contribDataLength');
        console.log(remainingContributorsListURL, 'contribURL');
        console.log(remainingContributorsListURL.length, 'contribURL');

        const secondPromiseArray = contributorsUrl.map(fetchURL);

        Promise.all(secondPromiseArray)
          .then(resp => {
            console.log(resp, 'resp');

            resp.forEach(item => {
              contributorsData = contributorsData.concat(item.data);
               
            });
            // contributorsData
            localStorage.setItem('contributors', JSON.stringify(contributorsData));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err, 'err'));
    }
    
    // console.log(response.data);
    // response.data.forEach(item => {
    //   console.log('a');
    //   axios
    //     .get(item.contributors_url, {
    //       headers: { Authorization: 'Token 097de95c321b3d1042695472de58c2c1fa32e3ac ' }
    //     })
    //     .then(res => {

    //       contrb = contrb.concat(res.data);
    //       console.log(contrb.length, 'aaasd');
    //     });
    // });

    // const url = 'https://api.github.com/repos/angular/angular.js/contributors';
    // axios
    //   .get('https://api.github.com/repos/angular/angular.js/contributors?per_page=100&page=1', {
    //     headers: { Authorization: 'Token 097de95c321b3d1042695472de58c2c1fa32e3ac ' }
    //   })
    //   .then(res => {
    //     const formattedURL = formatURL(res.headers.link, url);
    //     console.log(formattedURL);
    //     console.log(res.data);
    //   });

    
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
    axios
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
