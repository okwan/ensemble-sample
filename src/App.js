import React from 'react';
import SearchBar from './components/SearchInput';
import SearchResults from './components/SearchResults';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <main><SearchResults /></main>
      <Pagination />
    </div>
  );
}

export default App;
