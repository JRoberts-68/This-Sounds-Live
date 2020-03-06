
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
      <p>${moment(json[i].dates.start.localDate + " " + json[i].dates.start.localTime).format('MMMM Do YYYY, h:mm a')}</p>
      <p> ${json[i].priceRanges[0].min} - ${json[i].priceRanges[0].max} ${json[i].priceRanges[0].currency}</p>
      <a href="${json[i].url}" rel="noreferrer noopener" target="_blank">For event info click here</a>
      </li>`;
  }
  $('#ticketmaster-search-results').html(html);
  $('.events').show();
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
    .then(responseJson => displayResults(responseJson._embedded.events, query))
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

    //   let promises = [];
    //   responseJson._embedded.events.forEach(event => {
    //     setTimeout(promises.push(
    //       fetch(`https://app.ticketmaster.com/discovery/v2/events/${event.id}?apikey=${ticketmasterId}`, {mode:'no-cors' ,headers:{origin:'https://jroberts-68.github.io/This-Sounds-Live/'}})
    //     ),5000);

    //   })
    // console.log(promises);



*/