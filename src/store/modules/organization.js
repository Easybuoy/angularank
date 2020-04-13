import axios from 'axios';

import { formatURL, extractURL, fetchURL } from '../../utils';

const state = {
  organizations: []
};

const getters = {
  allOrganizations: currentState => currentState.organizations
};

const actions = {
  async getOrganizationss({ commit }) {
    // contributors_url
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
              console.log(contributorsData, 'contribData');
              console.log(contributorsData.length, 'contribDataLength');
            });
            localStorage.setItem('contributors', JSON.stringify(contributorsData));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err, 'err'));
  },
  async getOrganizations({ commit }) {
    const contributors = JSON.parse(localStorage.getItem('contributors'));
    console.log(contributors);
    console.log(contributors.length);

    const free = contributors.filter(item => item.login == 'free-easy');
    console.log(free);
    let groupedContributors = [];

    contributors.forEach(function(o) {
      if (!this[o.login]) {
        this[o.login] = { ...o, contributions: 0 };
        groupedContributors.push(this[o.login]);
      }
      this[o.login].contributions += o.contributions;
    }, Object.create(null));

    groupedContributors = groupedContributors.sort((a, b) => b.contributions - a.contributions);
    console.log(groupedContributors);
    const extractedUserUrl = extractURL(groupedContributors, 'url');

    // console.log(extractedUserUrl);
    commit('setOrganizations', groupedContributors);
    const promiseArray = extractedUserUrl.map(fetchURL);

    axios.all(promiseArray.map(p => p.catch(error => null))).then(data => {
      console.log(data);
      // localStorage.setItem('updatedContributors', JSON.stringify(data))
      data.forEach((item, i) => {
        // console.log(item.data.login, groupedContributors[i].login);
        if (item.data.login && groupedContributors[i].login) {
          if (item.data.login == groupedContributors[i].login) {
            console.log('a');
          }
        }

        // console.log(data, 'adasda');
      });

      return contributors;
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
