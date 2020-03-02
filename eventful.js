
let eventfulAuthUrl = 'http://api.eventful.com/json/events/search';
let eventfulId = 'jmHQsH6vVbgcLnmD';
let searchArtist = $('.artist').load(function(){
      let artist = $('.artist').text();
      return artist;
})
console.log(searchArtist);

let eventfulParams = {
    app_key: 'eventfulId',
    keywords: 'Lamb of God'
}

function queryFormatter (params) {
    let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return query.join('&');
}

function eventfulResp(array, maxResults=10){
  let queryString = queryFormatter(eventfulParams);
  let eventfulBuildUrl = eventfulAuthUrl + '?' + queryString;
  console.log(eventfulBuildUrl)
  fetch(eventfulBuildUrl)
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


function displayResults(responseJson){
  console.log(responseJson);
  $("#eventful-search-results").empty();
  for (let i=0; i < responseJson.data.length; i++){
    $('#eventful-search-results').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
    )
  }
$('.events').removeClass('hidden');
}

/*function artistReader(){

}*/