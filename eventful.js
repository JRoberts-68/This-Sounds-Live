
let ticketmasterAuthUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
let ticketmasterId = 'I4bfDLlgDuBOdPEOtWt8ZeYYl1gHgbku';
/*let searchArtist = '';
$('html').ajaxStop(searchArtist = $('.artist').text())
console.log(searchArtist);
*/
let ticketmasterParams = {
    apikey: ticketmasterId,
    keywords: 'Slayer'
}

function queryFormatter (params) {
    let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return query.join('&');
}

function ticketmasterBuildUrl(){
  let queryString = queryFormatter(ticketmasterParams);
  let ticketmasterBuildUrl = ticketmasterAuthUrl + '?' + ticketmasterParams;
}

function ticketmasterResp(array, maxResults=10){
  let queryString = queryFormatter(ticketmasterParams);
  console.log(ticketmasterBuildUrl)
  console.log(queryString)
  //fetch(ticketmasterBuildUrl, {
   // mode: 'cors'
  //})
  console.log(ticketmasterResp)
    .then(response => {
      console.log(response)
      if (response.ok) {
        return response.json();
      }
      
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .then(responseJson => console.log(responseJson))
    .catch(err => {
     // $('#js-error').text(`Something went wrong: ${err.message}`);
     console.log(err); 
    });
}


function displayResults(responseJson){
  console.log(responseJson);
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

ticketmasterResp();




/*
function artistReader(){

}

to add to 
  title
  location
  date
  image of the event should there be one





*/