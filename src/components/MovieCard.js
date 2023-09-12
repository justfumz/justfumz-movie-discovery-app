import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(prev => !prev);

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = isFavorite
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="movie-card" data-testid="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          data-testid="movie-poster"
        />
        <h2 data-testid="movie-title">{movie.title}</h2>
        <p data-testid="movie-release-date">
          Release Date: {movie.release_date}
        </p>
      </Link>
      <button onClick={handleToggleFavorite} >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
