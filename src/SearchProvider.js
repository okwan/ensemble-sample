import React, { createContext, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasError, setHasError] = useState(false);
  const [results, setResults] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (searchValue) => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`,
      );
      const omdbSearchResults = await response.json();

      if (omdbSearchResults.Response === 'False') {
        setHasError(true);
      }
      setResults(omdbSearchResults);
    }, 400),
    [],
  );

  const handleSearch = async (searchValue) => {
    setHasError(false);
    setSearchQuery(searchValue);
    debouncedSearch(searchValue);
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, results, handleSearch, hasError }}
    >
      {children}
    </SearchContext.Provider>
  );
};
