import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/search" component={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
