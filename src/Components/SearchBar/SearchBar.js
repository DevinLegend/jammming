import React, { useState } from 'react';
import SearchButton from '../SearchButton';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSearch = () => {
    if (term) {
      onSearch(term);
    }
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter a song, album, or artist"
        value={term}
        onChange={handleTermChange}
      />
      <SearchButton onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;