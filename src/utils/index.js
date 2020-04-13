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

export { formatURL, extractURL, fetchURL, axiosWithAuth };
