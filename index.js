'use strict';

const apiKey = 'wymxdOSRoePeEwKzIPoGSa31O5AZiBNmK4f9xI4K';
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log('responseJson: ', responseJson);
  $('#results-list').empty();
  for(let i = 0; i < responseJson.data.length; i++) {
    let data = responseJson.data[i];
    $('#results-list').append(`<li><p>${data.fullName}</p>
      <p>${data.description}</p>
      <a href="${data.url}">website</a>
      </li>
      `)
  };
  $('#results').removeClass('hidden');
};

function getParks(stateCode, maxResults=10) {
  const params = {
    api_key: apiKey,
    limit: maxResults,
    stateCode: stateCode
  };


  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log('url is: ', url);

  fetch(url)
    .then(response => {
      console.log('response is: ', response)
      if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#js-state-code').val();
    const maxResults = $('#js-max-results').val();

    getParks(stateCode, maxResults);
  });
}


$(watchForm);
