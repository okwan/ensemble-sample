import React from 'react';
import SearchBar from './components/SearchInput';
import SearchResults from './components/SearchResults';
import './App.css';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <main><SearchResults /></main>
    </div>
  );
}

export default App;
