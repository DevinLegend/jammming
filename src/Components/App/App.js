import logo from '../../logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React, { useState } from 'react';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Function to update the search results
  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  // Function to update the playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Function to update the playlist tracks
  const updatePlaylistTracks = (tracks) => {
    setPlaylistTracks(tracks);
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <div className="App-playlist">
        <SearchBar updateSearchResults={updateSearchResults}/>
        <div className="App-playlist-results">
          <SearchResults searchResults={searchResults}/>
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            updatePlaylistName={updatePlaylistName}
            updatePlaylistTracks={updatePlaylistTracks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
