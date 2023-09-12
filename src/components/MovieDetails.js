import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const apiKey = '7b68e3e1afd446f44546bdac647941ac';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2 data-testid="movie-title">{movie.title}</h2>
      <p data-testid="movie-release-date">{movie.release_date}</p>
      <p data-testid="movie-runtime">{movie.runtime} minutes</p>
      <p data-testid="movie-overview">{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;
