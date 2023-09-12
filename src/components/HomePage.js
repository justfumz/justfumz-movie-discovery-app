import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const apiKey = '7b68e3e1afd446f44546bdac647941ac';
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setTopMovies(data.results))
      .catch(error => console.error('Error fetching top movies:', error));
  }, []);

  return (
    <div className="homepage">
      {topMovies.map(movie => (
        <div className="movie-card" key={movie.id} data-testid="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            data-testid="movie-poster"
          />
          <h2 data-testid="movie-title">{movie.title}</h2>
          <p data-testid="movie-release-date">{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
