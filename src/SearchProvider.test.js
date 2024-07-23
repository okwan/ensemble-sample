import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchProvider, SearchContext } from './SearchProvider';
import debounce from 'lodash/debounce';

jest.mock('lodash/debounce');

describe('SearchProvider', () => {
  beforeEach(() => {
    debounce.mockImplementation((fn) => fn);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ Response: 'True', Search: [] }),
      }),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('handles search correctly', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            Response: 'True',
            Search: [{ Title: 'Movie 1' }],
          }),
      }),
    );

    render(
      <SearchProvider>
        <SearchContext.Consumer>
          {({ handleSearch, results }) => (
            <>
              <button onClick={() => handleSearch('Star wars')}>Search</button>
              {results.Search &&
                results.Search.map((result, index) => (
                  <div key={index}>{result.Title}</div>
                ))}
            </>
          )}
        </SearchContext.Consumer>
      </SearchProvider>,
    );

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
    });
  });

  test('handles errors correctly', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ Response: 'False', Error: 'Movie not found!' }),
      }),
    );

    render(
      <SearchProvider>
        <SearchContext.Consumer>
          {({ handleSearch, hasError }) => (
            <>
              <button onClick={() => handleSearch('Unknown')}>Search</button>
              {hasError && <div>Error occurred</div>}
            </>
          )}
        </SearchContext.Consumer>
      </SearchProvider>,
    );

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });
  });
});
