
let ticketmasterAuthUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
let ticketmasterId = 'I4bfDLlgDuBOdPEOtWt8ZeYYl1gHgbku';


function queryFormatter (params) {
    let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return query.join('&');
}

// displays results recieved and iterates through different if statements to gather and display relevent data

function displayResults(json, query){
  $("#ticketmaster-search-results").empty();
  $('#js-error').empty();
  if(json._embedded === undefined){
    $('h3').text(`No events for ${query}`);
    $('.events').show();
    return;
  } 
  json = json._embedded.events;
  console.log(json);
  $('h3').text(`Events for ${query}`);
  let html = "";
  for (let i=0; i < json.length; i++){
    let event = json[i];
    console.log(i);
    html += "<li>";
    // name of venue
    if(event.name !== undefined){
      html += `<h3>${event.name}</h3>`;
    }
    // date of venue
    if(event.dates !== undefined){
      if(moment(event.dates.start.localDate + " " + event.dates.start.localTime).format('MMMM Do YYYY, h:mm a') == 'invalid date'){
          html += `<p>TBD</p>`;
      } else {html += `<p>${moment(event.dates.start.localDate + " " + event.dates.start.localTime).format('MMMM Do YYYY, h:mm a')}</p>`;}
    }
    // address of venue
    if(event._embedded !== undefined){
    if(event._embedded.venues[0].state !== undefined && event._embedded.venues[0].address.line1 !== undefined){
      html += `<p>${event._embedded.venues[0].address.line1}</p><p>${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}, ${event._embedded.venues[0].country.countryCode} ${event._embedded.venues[0].postalCode}</p>`;
    }else {
     html += `<p>${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].country.name}</p>`;
    }}
    // price ranges
    if(event.priceRanges!== undefined){
      html += `<p> ${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}</p>`;
    }
    // event url
    if(event.url!== undefined){
      html += `<a href="${event.url}" rel="noreferrer noopener" target="_blank">For more event info click here</a>`;
    }
    html += `</li><br>`;
  }
  
  $('#ticketmaster-search-results').html(html);
  $('.events').show();
}

// builds then fetches the search url to create the proper pathway to return requested information

function ticketmasterBuildUrl(query){
  let ticketmasterParams = {
    keyword: query,
    apikey: ticketmasterId
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
    .then(responseJson => displayResults(responseJson, query))
      .catch(err => {
        $('#js-error').text(`Something went wrong: ${err.message}`);
      });
}

// watchform to hold events until the information needed is submitted

function watchForm() {
  $('.search-inputs').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-bar').val();
    ticketmasterBuildUrl(searchTerm);
  });
}
$(watchForm());


