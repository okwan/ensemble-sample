import React, { useContext } from 'react';
import { SearchContext } from '../../SearchProvider';

const Pagination = () => {
  const { results, handlePage, pageNum } = useContext(SearchContext);

  return (
    <div className="pagination">
      {results.totalResults > 10 && pageNum > 1 && (
        <button onClick={() => handlePage(pageNum - 1)}>Prev page</button>
      )}
      {results.totalResults > 10 && (
        <button onClick={() => handlePage(pageNum + 1)}>Next page</button>
      )}
    </div>
  );
};

export default Pagination;
