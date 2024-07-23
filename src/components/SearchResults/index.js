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
            <img
              src={poster}
              alt={title + ' poster'}
              className="movie-list__item-poster"
            />
            <p className="movie-list__item-title">{title}</p>
            {year.endsWith('–') ? year.slice(0, year.length - 1) + ' – Current' : year}
            <br/> <br />
            <button onClick={() => {}}>Button</button>
          </li>
        );
      })}
    </ul>
  ) : (
    searchQuery && (
      <p>
        Please refine your search. Your search of <strong>{searchQuery}</strong>{' '}
        is displaying too many results or none was found.
      </p>
    )
  );
}

export default SearchResults;
