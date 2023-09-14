import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import Logo from './Logo.png';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const apiKey = '7b68e3e1afd446f44546bdac647941ac';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMovieDetails(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;

  return (
    <div>
      <header className="header">
        <div className="header-background">
          <Link to="/">
            <img
              src={backdropUrl}
              alt={movieDetails.title}
              className="background-image"
            />
          </Link>
          <div className="overlay"></div>

          <div className="header-left">
            <p>
              <a href="/">
                <img src={Logo} alt="Logo" className="logo" />
              </a>
            </p>
          </div>
        </div>
      </header>

      <div className="movie-details">
        <h2 data-testid="movie-title">{movieDetails.title}</h2>
        <p data-testid="movie-release-date">
          Release Date (UTC): {movieDetails.release_date}
        </p>
        <p data-testid="movie-runtime">
          Runtime: {movieDetails.runtime} minutes
        </p>
        <p data-testid="movie-overview">{movieDetails.overview}</p>
        {/* Add more movie details such as director, cast, etc. here */}
      </div>
    </div>
  );
};

export default MovieDetails;
