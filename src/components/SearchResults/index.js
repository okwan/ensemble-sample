import React, { useContext } from 'react';
import { SearchContext } from '../../SearchProvider';

import './SearchResults.css';

function SearchResults() {
  const { searchQuery, results, hasError } = useContext(SearchContext);

  return !hasError ? (
    <ul className="movie-list">
      {results.Search?.map((movie, index) => {
        const { Poster: poster, Title: title, Year: year } = movie;

        return (
          <li key={index} className="movie-list__item">
            <img src={poster} alt="" />
            {title}
            {year}
          </li>
        );
      })}
    </ul>
  ) : (
    searchQuery && (
      <p>
        Please refine your search. Your search of <strong>{searchQuery}</strong>{' '}
        is displaying too many results.
      </p>
    )
  );
}

export default SearchResults;
