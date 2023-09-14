import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Logo from './Logo.png';

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [johnWickMovie, setJohnWickMovie] = useState(null);
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

  const handleWatchTrailer = () => {
    if (johnWickMovie && johnWickMovie.trailerUrl) {
      window.open(johnWickMovie.trailerUrl, '_blank');
    } else {
      alert('No trailer available for John Wick movie.');
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
      .then(data => setTopMovies(data.results.slice(0, 10)))
      .catch(error => setError(error.message));

    const johnWickMovieId = 458156;
    const movieUrl = `https://api.themoviedb.org/3/movie/${johnWickMovieId}?api_key=${apiKey}`;

    fetch(movieUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setJohnWickMovie(data);
      })
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="homepage">
      <header className="header">
        {johnWickMovie && (
          <div className="header-background">
            <img
              src={`https://image.tmdb.org/t/p/original${johnWickMovie.backdrop_path}`}
              alt={johnWickMovie.title}
              className="background-image"
            />

            <div className="overlay"></div>

            <div className="header-left">
              <p>
                <a href="/">
                  <img src={Logo} alt="Logo" className="logo" />
                </a>
              </p>
            </div>

            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for movies"
              />
            </div>

            <div className="header-right">
              <h4>Sign-in</h4>
            </div>

            <div className="movie-info">
              <h1>{johnWickMovie.title}</h1>
              <p>{johnWickMovie.overview}</p>
              <p>Rating: {johnWickMovie.vote_average}</p>
              <button className="button-watch" onClick={handleWatchTrailer}>
                Watch Trailer
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="featured">
        <h2>Featured Movies</h2>
        <h3>
          <Link to="#">See More</Link>
        </h3>
      </div>

      <div className="movies-grid">
        {topMovies && topMovies.length > 0 ? (
          topMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies available</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
