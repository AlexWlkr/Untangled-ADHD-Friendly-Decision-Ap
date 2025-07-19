import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./tmdb";

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

  {movies[0]?.poster_path && (
    <div className="movie-poster">
      <img
        src={`https://image.tmdb.org/t/p/w342${movies[0].poster_path}`}
        alt={movies[0].title}
      />
    </div>
  )}
</div>
  );
}

export default MovieSuggestion;
