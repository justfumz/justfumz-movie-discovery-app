import React, { useState } from 'react';
import MovieCard from './MovieCard';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=7b68e3e1afd446f44546bdac647941ac&query=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div>Loading...</div>}

      <div className="search-results">
        {searchResults.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
