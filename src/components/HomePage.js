import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const apiKey = '7b68e3e1afd446f44546bdac647941ac';
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );
      const data = await response.json();
      setTopMovies(data.results);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const apiKey = '7b68e3e1afd446f44546bdac647941ac';
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTopMovies(data.results.slice(0, 10))) // Limit to top 10 movies
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="homepage">
        {topMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
