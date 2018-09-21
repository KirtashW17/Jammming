let AccessToken;
const client_id = 'a59c40bc05f2470ba90cb7fa553914ca'; //register your own Spotify API key
const redirectURL = "http://localhost:3000/";

const Spotify = {
    getAccessToken(term) {
        if (AccessToken) {
            return AccessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            AccessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => AccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); //Clear the parameters from the URL
            return AccessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirectURL}&response_type=token&scope=playlist-modify-public&state=${term}`;
            //let x = window.location.href.match(/state=([^&]*)/);
            //Spotify.search(window.location.href.match(/state=([^&]*)/))
        }
    },

    search(term) {
        AccessToken = Spotify.getAccessToken(term);

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    {
        headers: { Authorization: 'Bearer ' + AccessToken }
    }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }).then(jsonResponse => {
            if (!jsonResponse.tracks.items) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => (
                    {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                        preview_url: track.preview_url
                    })
                );
            }
        });
    },

    savePlaylist(playlistName, arrayURIs) {
        const AccessToken = this.getAccessToken();
        const headers = { Authorization: 'Bearer ' + AccessToken }
        let userID;
        let playlistID;

        if (playlistName && arrayURIs) {
            fetch(`https://api.spotify.com/v1/me`, {headers: headers}
            ).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Failed to get userID');
                }
            }).then(jsonResponse => {
                userID = jsonResponse.id;
                fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ name: playlistName})
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('Failed to create playlist');
                    }
                }).then(jsonResponse => {
                    playlistID = jsonResponse.id;
                    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: arrayURIs})
                    })
                });
            });
        }
    }
}

export default Spotify;
