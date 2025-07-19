import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./tmdb";
import fallbackMovie from "./assets/fallback-movie-poster.jpg";

function MovieSuggestion() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
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
