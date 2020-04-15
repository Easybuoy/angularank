import parse from 'parse-link-header';
import axios from 'axios';

const axiosWithAuth = () => {
  return axios.create({
    headers: { Authorization: 'Token 097de95c321b3d1042695472de58c2c1fa32e3ac ' },
    baseURL: 'https://api.github.com'
  });
};
const formatURL = (linkHeader, url) => {
  let startingPoint = 1;
  const parsedLink = parse(linkHeader);

  let formatURLResponse = [];

  while (Number(parsedLink.last.page) > startingPoint) {
    startingPoint += 1;
    const formatedURL = `${url}?per_page=100&page=${startingPoint}`;
    formatURLResponse = formatURLResponse.concat(formatedURL);
  }

  return formatURLResponse;
};

const extractURL = (data, property) => {
  let response = [];

  data.forEach(item => {
    if (item[property]) {
      response = response.concat(item[property]);
    }
  });

  return response;
};

const fetchURL = url =>
  axios.get(url, {
    headers: { Authorization: 'Token 097de95c321b3d1042695472de58c2c1fa32e3ac ' }
  });

const oneDayAgo = date => {
  let oneDayAgo = new Date();
  oneDayAgo = oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const difference = date - oneDayAgo;
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  if (daysDifference === 0) {
    return false;
  }
  return true;
};

const initializeLocalStorage = () => {
  if (!localStorage.getItem('contributorsData')) {
    localStorage.setItem('contributorsData', JSON.stringify({}));
  }

  if (!localStorage.getItem('updatedContributorsData')) {
    localStorage.setItem('updatedContributorsData', JSON.stringify({}));
  }
};

const addDataToLocalStorage = (data, itemKey, key) => {
  initializeLocalStorage();

  try {
    const contributorsData = JSON.parse(localStorage.getItem(itemKey));
    if (contributorsData) {
      const newData = {
        [key]: data,
        created_at: Date.now()
      };
      localStorage.setItem(itemKey, JSON.stringify(newData));
      return newData;
    }
  } catch (err) {
    return false;
  }
};

const getItemFromLocalStorage = (itemKey, key) => {
  initializeLocalStorage();
  try {
    const contributorsData = JSON.parse(localStorage.getItem(itemKey));
    if (!oneDayAgo(contributorsData.created_at)) {
      return contributorsData[key];
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getContributorsDetail = (commit, contributors) => {
  const updatedContributorsData = getItemFromLocalStorage(
    'updatedContributorsData',
    'contributors'
  );

  if (updatedContributorsData === null) {
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
    const extractedUserUrl = extractURL(groupedContributors, 'url');

    // commit('setOrganizations', groupedContributors);
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

        data.forEach((item, i) => {
          if (item.data.login && filteredData[i].login) {
            if (item.data.login === filteredData[i].login) {
              filteredData[i].followers = item.data.followers;
              filteredData[i].public_repos = item.data.public_repos;
              filteredData[i].public_gists = item.data.public_gists;
            }
          }
        });
        addDataToLocalStorage(filteredData, 'updatedContributorsData', 'contributors');
        commit('setOrganizations', filteredData);
        return filteredData;
      });
  }

  commit('setOrganizations', updatedContributorsData);
};

export {
  formatURL,
  extractURL,
  fetchURL,
  axiosWithAuth,
  addDataToLocalStorage,
  getItemFromLocalStorage,
  getContributorsDetail
};
