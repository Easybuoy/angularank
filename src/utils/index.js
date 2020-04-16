import parse from 'parse-link-header';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { VUE_APP_TOKEN } = process.env;
const axiosWithAuth = () => axios.create({
  headers: { Authorization: VUE_APP_TOKEN },
  baseURL: 'https://api.github.com',
});
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

  data.forEach((item) => {
    if (item[property]) {
      response = response.concat(item[property]);
    }
  });

  return response;
};

const fetchURL = (url) => axiosWithAuth().get(url);

const oneDayAgo = (date) => {
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
        created_at: Date.now(),
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

    contributors.forEach(function (o) {
      if (!this[o.login]) {
        this[o.login] = { ...o, contributions: 0 };
        groupedContributors.push(this[o.login]);
      }
      this[o.login].contributions += o.contributions;
    }, Object.create(null));

    groupedContributors = groupedContributors.filter((item) => item.url !== undefined);
    const extractedUserUrl = extractURL(groupedContributors, 'url');

    const promiseArray = extractedUserUrl.map(fetchURL);
    const notFound = [];
    axios
      .all(
        promiseArray.map((p) => p.catch((error) => {
          notFound.push(error.response.config.url);
          return {};
        }))
      )
      .then((data) => {
        const filteredData = groupedContributors.filter((item) => {
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
        const paginatedContributors = filteredData.slice(0, 100);

        commit('setPaginatedContributors', paginatedContributors);
        commit('setContributors', filteredData);
        commit('setLoading');
        return filteredData;
      })
      .catch(() => {
        commit('setError', 'Error loading contributor details');
        commit('setLoading');
      });
  } else {
    const paginatedContributors = updatedContributorsData.slice(0, 100);
    commit('setPaginatedContributors', paginatedContributors);
    commit('setContributors', updatedContributorsData);
    commit('setLoading');
  }
};

const paginateTotalPageNumber = (data) => {
  const totalPage = data.length / 100;

  return Math.round(totalPage);
};

const paginateTotalPage = (data, newPage) => {
  let start = 0;
  const end = Number(`${newPage}00`);
  if (newPage > 1) {
    start = Number(`${newPage - 1}00`);
  }

  const paginatedContributors = data.slice(start, end);
  return paginatedContributors;
};

export {
  formatURL,
  extractURL,
  fetchURL,
  axiosWithAuth,
  addDataToLocalStorage,
  getItemFromLocalStorage,
  getContributorsDetail,
  paginateTotalPageNumber,
  paginateTotalPage,
};
