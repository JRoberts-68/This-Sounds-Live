
let ticketmasterAuthUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
let ticketmasterId = 'I4bfDLlgDuBOdPEOtWt8ZeYYl1gHgbku';


function queryFormatter (params) {
    let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return query.join('&');
}

function displayResults(json){
  console.log(json);
  $("#ticketmaster-search-results").empty();
  let html = "";
  for (let i=0; i < json.length; i++){
    html += `<li><h3>${json[i].name}</h3>
      <p>${json[i].dates.start.localDate} ${json[i].dates.start.localTime}</p>
      <a href="${json[i].url}">${json[i].url}</a>
      </li>`;
  }
  $('#ticketmaster-search-results').html(html)
$('.events').removeClass('hidden');
}

// just a test

function ticketmasterBuildUrl(query){
  let ticketmasterParams = {
    apikey: ticketmasterId,
    keyword: query,
}
  let queryString = queryFormatter(ticketmasterParams);
  let ticketmasterUrl = ticketmasterAuthUrl + '?' + queryString;

  fetch (ticketmasterUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson._embedded.events))
      .catch(err => {
        $('#js-error').text(`Something went wrong: ${err.message}`);
      });
}

//console.log(ticketmasterBuildUrl)

function watchForm() {
  $('.search-inputs').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-bar').val();
    ticketmasterBuildUrl(searchTerm);
  });
}
$(watchForm());


/*


to add to 
  title
  location
  date
  image of the event should there be one





*/