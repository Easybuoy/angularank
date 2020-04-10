import parse from 'parse-link-header';

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

const formatContributorURL = data => {
  let response = [];

  data.forEach(item => {
    response = response.concat(item.contributors_url);
  });

  return response;
};

export { formatURL, formatContributorURL };
