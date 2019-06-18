'use strict';

const apiKey = 'XO7bZfNglYYLNPWLfqVIomzDHgcJxCx3yh3PDZUK';
const searchURL = 'developer.nps.gov/api/v1';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(stateCode, maxResults=10) {
  const params = {
    key: apiKey,
    q: parkName,
    stateCode: stateCode
  };

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log(url);
}


function watchForm() {
  ('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#js-state-code').val();
    const maxResults = $('#js-max-results').val();

    getParks(stateCode, maxResults);
  });
}


$(watchForm);
