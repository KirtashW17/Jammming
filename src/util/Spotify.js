const clientId = 'a59c40bc05f2470ba90cb7fa553914ca'; // Set your own ClientID
const link = 'http://localhost:3000'; //this is the redirect URL,after login in your Spotify account, you will redirected here.
let accessToken;

const Spotify = {
  getSavedValue(v){
    if (sessionStorage.getItem(v) === null) {
      return [];
    }
    else if (sessionStorage.getItem(v) !== undefined){
      return JSON.parse(sessionStorage.getItem(v));
    }
  },
  //Get access token by URL
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)){
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn*1000);
      window.history.pushState('Access Token', null, '/')
      return accessToken;
    }
    else{
      let url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${link}`;
      window.location = url;
    }
  },
  search(term) {
    //const accessToken = Spotify.getAccessToken();
    //Search tracks on Spotify API
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
            Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        console.log('API request failed');
      }
    }).then(
      jsonResponse => {
        if(!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(function(track){
          //if (Spotify.getSavedValue('playlists').find(savedTrack => savedTrack.id === track.id)){return;}
          //else {
          return({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          cover: track.album.images[2].url
        });
      //}
        });
      }
    );
  },
  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;
    // Return user's ID from Spotify API
    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(
      response => {
        if(response.ok) {
          return response.json();
        }
    }).then(
      jsonResponse => {
        userId = jsonResponse.id;
        // Adds playlist to user's account
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        }).then(
          response => {
            if (response.ok) {
              return response.json();
            } else {
              console.log('API request failed');
            }
        }).then(
          jsonResponse => {
            const playlistId = jsonResponse.id;
            // Adds tracks to new playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris})
            });
        });
    });
  }
}



export default Spotify;
