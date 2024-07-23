import React, { createContext, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [results, setResults] = useState([]);

  const fetchResults = async (query, page) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`,
      );
      const omdbSearchResults = await response.json();
      if (omdbSearchResults.Response === 'False') {
        setHasError(true);
        setResults([]);
      } else {
        setHasError(false);
        setResults(omdbSearchResults);
      }
    } catch (error) {
      setHasError(true);
      setResults([]);
    }
  };

  const debouncedFetchResults = useCallback(
    debounce((query, page) => fetchResults(query, page), 400),
    [],
  );

  const handleSearch = (searchValue) => {
    setSearchQuery(searchValue);
    debouncedFetchResults(searchValue, 1);
  };

  const handlePage = (page) => {
    setPageNum(page);
    fetchResults(searchQuery, page);
  };

  return (
    <SearchContext.Provider
      value={{
        pageNum,
        searchQuery,
        results,
        handleSearch,
        handlePage,
        hasError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
