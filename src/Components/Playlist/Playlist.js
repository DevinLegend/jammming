import React, { useState } from 'react';
import SaveToSpotifyButton from '../SaveToSpotifyButton';
import Tracklist from '../Tracklist/Tracklist';
import Spotify from '../../Components/utils/Spotify';

const Playlist = ({ playlistName, playlistTracks, updatePlaylistName, updatePlaylistTracks }) => {
  const [newPlaylistName, setNewPlaylistName] = useState(playlistName);

  const handleNameChange = (e) => {
    setNewPlaylistName(e.target.value);
  };

  const handleNameBlur = () => {
    updatePlaylistName(newPlaylistName);
  };

  const handleSave = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);

    Spotify.savePlaylist(newPlaylistName, trackURIs)
      .then(() => {
        // Playlist saved successfully
        console.log('Playlist saved to Spotify');
        // You can add additional logic here, such as displaying a success message to the user
      })
      .catch((error) => {
        // Error saving the playlist
        console.error(error);
        // You can add additional error handling logic here, such as displaying an error message to the user
      });
  };

  return (
    <div className="Playlist">
      <input
        value={newPlaylistName}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
      />
      <Tracklist
        playlistTracks={playlistTracks}
        updatePlaylistTracks={updatePlaylistTracks}
      />
      <SaveToSpotifyButton onSave={handleSave} />
    </div>
  );
};

export default Playlist;