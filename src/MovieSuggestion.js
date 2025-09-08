import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "./tmdb";
import fallbackMovie from "./assets/fallback-movie-poster.jpg";

function MovieSuggestion() {
  const [movies, setMovies] = useState([]);

useEffect(() => {
  console.log("[MovieSuggestion] mounted");
  console.log("fetchPopularMovies is", fetchPopularMovies);
  fetchPopularMovies()
    .then((arr) => {
      console.log("TMDB popular results:", arr);
      setMovies(arr);
    })
    .catch((e) => console.error("TMDB fetch failed:", e));
}, []);

  return (
<div className="movie-box">
  <div className="movie-list">
    <h3>Popular Movie Picks to Get You Started</h3>
    <ul>
      {movies.slice(0, 5).map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  </div>

{movies.length > 0 && (
  <div className="movie-poster">
    <img
      src={
        movies[0].poster_path
          ? `https://image.tmdb.org/t/p/w342${movies[0].poster_path}`
          : fallbackMovie
      }
      alt={movies[0].poster_path ? movies[0].title : "Default movie poster"}
    />
  </div>
)}
</div>
  );
}

export default MovieSuggestion;
