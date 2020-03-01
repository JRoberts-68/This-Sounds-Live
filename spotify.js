let spotifyAuthUrl = "https://accounts.spotify.com/authorize";
let spotifyID = "33f74d3d8a694e9c8b21101e8454e868";
let currentPlayUrl = "https://api.spotify.com/v1/me/player/currently-playing";
let spotifyParams = {
    client_id: spotifyID,
    response_type: 'token',
    redirect_uri: "https://jroberts-68.github.io/This-Sounds-Live/",
    scope: "user-read-currently-playing user-read-playback-state",
}

spotifyAuthUrl +
  '?response_type=token' +
  '&client_id=' + spotifyID +
  (spotifyParams.scope ? '&scope=' + encodeURIComponent(spotifyParams.scope) : '') +
  '&redirect_uri=' + encodeURIComponent(spotifyParams.redirect_uri));

function queryFormatter (params) {
    // let query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    let query = spotifyAuthUrl + '?response_type=token' + '&client_id=' + spotifyID +
    (spotifyParams.scope ? '&scope=' + encodeURIComponent(spotifyParams.scope) : '') +
    '&redirect_uri=' + encodeURIComponent(spotifyParams.redirect_uri);
  return query;
}

function spotifyAuth () {
    let queryString = queryFormatter(spotifyParams);
    let authURL = spotifyAuthUrl + '?' + queryString;
    window.location.replace(authURL);
}

function fetchPlayback (token) {
    fetch(currentPlayUrl, {
        Authorization: `Bearer ${token}`,
    })
        .then(response => {
            if(response.status === 200){
                return response.json();
            } else if(response.status === 204){
                throw new Error(alert('No track currently playing'));
             }
        })
        .then(responseJSON => console.log(responseJSON))
        .catch(err => alert(err))
}

function getArtist (json) {

}

function loginMessage () {
    $('.playing').html(`<p class="signin-message">Please sign in to use This Sounds Live</p><input id="login" type="submit" value="Sign In">`);
    $('#login').click(function(event){
        event.preventDefault();
        spotifyAuth();
    })
}

function checkForToken () {
    let url = document.location + '';
    let tokenLoc = url.search('access_token') + 13;
    let denied = url.search('error');

    if(tokenLoc === 12 | denied === 5){
        loginMessage();
    }else {
        let token = url.slice(tokenLoc, url.search('&'));
        console.log(token);
        fetchPlayback(token);
    }
}

$(checkForToken());