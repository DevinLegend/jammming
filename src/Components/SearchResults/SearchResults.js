import React from 'react';
import Tracklist from './Tracklist';

const SearchResults = ({ searchResults }) => {
  // Define the search results data (you can use mock data for now)
  const mockResults = [
    { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
    // Add more tracks as needed
  ];

  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      <Tracklist tracks={mockResults} />
    </div>
  );
};

export default SearchResults;