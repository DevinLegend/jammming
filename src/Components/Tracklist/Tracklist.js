import React from 'react';
import Track from '../Track/Track';

const Tracklist = ({ tracks, playlistTracks, updatePlaylistTracks }) => {
  if (!tracks) {
    return null; // or render a loading indicator or fallback content
  }

  const addTrack = (track) => {
    const isTrackInPlaylist = playlistTracks.find((playlistTrack) => playlistTrack.id === track.id);
    if (!isTrackInPlaylist) {
      const updatedPlaylistTracks = [...playlistTracks, track];
      updatePlaylistTracks(updatedPlaylistTracks);
    }
  };

  const removeTrack = (track) => {
    const updatedPlaylistTracks = playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id);
    updatePlaylistTracks(updatedPlaylistTracks);
  };

  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track key={track.id} track={track} onAdd={addTrack} onRemove={removeTrack} />
      ))}
    </div>
  );
};

export default Tracklist;