
let ticketmasterAuthUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
let ticketmasterId = 'I4bfDLlgDuBOdPEOtWt8ZeYYl1gHgbku';
/*let searchArtist = '';
$('html').ajaxStop(searchArtist = $('.artist').text())
console.log(searchArtist);
*/


function queryFormatter (params) {
    let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return query.join('&');
}

function displayResults(json){
  console.log(json);
  $("#ticketmaster-search-results").empty();
  for (let i=0; i < responseJson.data.length; i++){
    $('#ticketmaster-search-results').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
    )
  }
$('.events').removeClass('hidden');
}

// just a test

function ticketmasterBuildUrl(){
  let ticketmasterParams = {
    apikey: ticketmasterId,
    keywords: 'Slayer'
}
  let queryString = queryFormatter(ticketmasterParams);
  let ticketmasterBuildUrl = ticketmasterAuthUrl + '?' + queryString;

  fetch (ticketmasterBuildUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error').text(`Something went wrong: ${err.message}`);
      });
}


function watchForm() {
  $('#search-bar').submit(event => {
    event.preventDefault();
    const searchTerm = $('.js-search').val();
    const maxResults = $('#ticketmaster-search-results').val();
    ticketmasterBuildUrl(searchTerm, maxResults);
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