import axios from 'axios';

let accessToken = '';
let expiresIn = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      // Redirect user to Spotify authorization URL to obtain access token
      const clientId = '6d702c6448a04c9f97281694d1288b89';
      const redirectUri = 'http://localhost:3000/';
      const scope = 'user-read-private user-read-email'; // Add any additional scopes required
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
        scope
      )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = authUrl;
    }
  },

  isAccessTokenExpired() {
    return !accessToken || Date.now() > expiresIn;
  },

  clearAccessToken() {
    accessToken = '';
    expiresIn = '';
  },

  
  search(query) {
    const accessToken = this.getAccessToken();
    const apiUrl = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    return axios.get(apiUrl, { headers })
      .then(response => {
        if (response.status === 200) {
          return response.data.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        } else {
          throw new Error('Failed to fetch tracks from Spotify API.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }

    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    let userId;
    const apiUrl = 'https://api.spotify.com/v1/me';

    return axios
      .get(apiUrl, { headers })
      .then(response => {
        userId = response.data.id;
        const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const playlistData = {
          name: playlistName
        };

        return axios.post(createPlaylistUrl, playlistData, { headers });
      })
      .then(response => {
        const playlistId = response.data.id;
        const addTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
        const trackURIsData = trackURIs.map(uri => ({ uri }));

        return axios.post(addTracksUrl, { uris: trackURIsData }, { headers });
      })
      .catch(error => {
        console.error(error);
      });
  }
  // Add other Spotify API methods here
};

export default Spotify;
