
let ticketmasterAuthUrl = 'https://app.ticketmaster.com/discovery/v2/events.json/';
let ticketmasterId = 'I4bfDLlgDuBOdPEOtWt8ZeYYl1gHgbku';


function queryFormatter (params) {
    let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return query.join('&');
}

function displayResults(json, query){
  console.log(json);
  $("#ticketmaster-search-results").empty();
  $('h3').text(`Events for ${query}`);
  let html = "";
  for (let i=0; i < json.length; i++){
    console.log(json[i].id);
    html += `<li><h3>${json[i].name}</h3>
      <p>${json[i].dates.start.localDate} ${json[i].dates.start.localTime}</p>
      <p>${json[i].pricesRanges[0].min} ${json[i].pricesRanges[0].max}</p>
      <a href="${json[i].url}" rel="noopener noreferrer" target="_blank">For more information about ${json[i].name} click here</a></li>`;
      
      let eventIdUrl = `https://app.ticketmaster.com/discovery/v2/events/` + json[i].id + `.json?apikey=${ticketmasterId}`;

      // html += `
      // `
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
    .then(responseJson => {

    //   let promises = [];
    //   responseJson._embedded.events.forEach(event => {
    //     promises.push(
    //       fetch(`https://app.ticketmaster.com/discovery/v2/events/${event.id}.json?apikey=${ticketmasterId}`)
    //     );
    //   })
    // console.log(promises);
      displayResults(responseJson._embedded.events, query)
    })
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