import React from 'react';

const Header = ({ movieInfo }) => {
  const { title, overview, rating, backdropPath } = movieInfo;

  return (
    <header className="header">
      <div className="header-left">
        <img src="https://placehold.co/100" alt="Logo" className="logo" />
        LOGO
      </div>
      <nav className="nav">
        <button className="search-button">Search</button>
      </nav>
      <div className="header-right">
        <p className="sign-in-text">Sign In</p>
      </div>
      <div className="header-background">
        <img
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          alt={title}
          className="background-image"
        />
        <div className="overlay"></div>
        <div className="movie-info">
          <h1>{title}</h1>
          <p>{overview}</p>
          <p>Rating: {rating}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
