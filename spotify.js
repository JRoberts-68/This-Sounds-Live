let spotifyAuthUrl = "https://accounts.spotify.com/authorize";
let spotifyID = "33f74d3d8a694e9c8b21101e8454e868";
let currentPlayUrl = "https://api.spotify.com/v1/me/player/currently-playing";
let spotifyParams = {
    client_id: spotifyID,
    response_type: 'token',
    redirect_uri: "https://jroberts-68.github.io/This-Sounds-Live/",
    scope: "user-read-currently-playing user-read-playback-state",
}

function queryFormatter (params) {
    let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return query;
}

function spotifyAuth () {
    let queryString = queryFormatter(spotifyParams);
    let authURL = spotifyAuthUrl + '?' + queryString;
    window.location.replace(authURL);
}

function fetchPlayback (token) {

    let currentPlayHeader = {headers: new Headers({
    Authorization: `Bearer ${token}`
})};

    fetch(currentPlayUrl, currentPlayHeader)

        .then(response => {
            if(response.status === 200){
                return response.json();
            } else if(response.status === 204){
                alert('To get events for the currently playing artist go to Spotify and play a track and sign in again.');
                window.location.replace('https://jroberts-68.github.io/This-Sounds-Live/');
             } else if(response.status === 401) {
                    window.location.replace('https://jroberts-68.github.io/This-Sounds-Live/');
             }
        })
        .then(responseJSON => getTrackInfo(responseJSON))
        .catch(err => alert(err))
}

function getTrackInfo (json) {
    json = json.item;
    if(json !== undefined) {
        $('.playing').html(`<figure><img src="${json.album.images[1].url}" alt="${json.album.name} by ${json.artists[0].name} cover"></figure><h4 class="artist">${json.artists[0].name}</h4><p class="song">${json.name}</p><p class="album">${json.album.name}</p>`);
    // passes artist name as a query to ticketmaster
        ticketmasterBuildUrl(json.artists[0].name);} else{
            $('.playing').html(`<p>No track info</p>`);
        }
}


function loginMessage () {
    $('.playing').html(`<p class="signin-message">Sign in to use This Sounds Live to find events for your currently playing artist on Spotify or search for artist events manually</p><input id="login" type="submit" value="Sign In">`);
    $('#login').click(function(event){
        event.preventDefault();
        spotifyAuth();
    })
}
// Check if user has access token from Spotify
function checkForToken () {
    $('.events').hide();
    let url = document.location + '';
    let tokenLoc = url.search('access_token') + 13;
    let denied = url.search('error');

    if(tokenLoc === 12 | denied === 5){
        // if not logged in or denied access they are taken to the home screen
        loginMessage();
    }else {
        let token = url.slice(tokenLoc, url.search('&'));
        // token found and playback is fetched
        fetchPlayback(token);
    }
}

$(checkForToken());