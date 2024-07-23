import React, { useContext } from 'react';
import { SearchContext } from '../../SearchProvider';

import './SearchInput.css';

const SearchInput = () => {
  const { searchQuery, handleSearch } = useContext(SearchContext);

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <search>
      <label htmlFor="search-movie">Search movies</label>
      <input
        id="search-movie"
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search by movie title..."
      />
    </search>
  );
};

export default SearchInput;
