import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./tmdb";

function MovieSuggestion() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  return (
    <div className="movie-suggestions">
      <h3>Popular Movie Picks to Get You Started</h3>
      <ul>
       {movies.slice(0, 5).map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSuggestion;
