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
    console.log('aaa');
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
};

const addDataToLocalStorage = (data, key) => {
  initializeLocalStorage();

  try {
    const contributorsData = JSON.parse(localStorage.getItem('contributorsData'));
    if (contributorsData) {
      const newContributorsData = {
        contributors: data,
        created_at: Date.now()
      };
      localStorage.setItem('contributorsData', JSON.stringify(newContributorsData));
      return newContributorsData;
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

export {
  formatURL,
  extractURL,
  fetchURL,
  axiosWithAuth,
  addDataToLocalStorage,
  getItemFromLocalStorage
};
