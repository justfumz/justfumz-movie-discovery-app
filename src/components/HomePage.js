import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
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
    }
  };
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
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
    <div className="homepage">
      <header className="header">
        {topMovies.length > 0 && (
          <div className="header-background">
            <img
              src={`https://image.tmdb.org/t/p/original${topMovies[0].backdrop_path}`}
              alt={topMovies[0].title}
              className="background-image"
            />
            <div className="overlay"></div>
            <div className="header-left">
              <img src="https://placehold.co/200" alt="Logo" className="logo" />
              Logo
            </div>

            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for movies"
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            <div className="header-right">
              <p className="sign-in-text">Sign In</p>
            </div>
            <div className="movie-info">
              <h1>{topMovies[0].title}</h1>
              <p>{topMovies[0].overview}</p>
              <p>Rating: {topMovies[0].vote_average}</p>
            </div>
          </div>
        )}
      </header>

      <div className="homepage"></div>

      {topMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default HomePage;
