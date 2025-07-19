import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./tmdb";

function MovieSuggestion() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h3>Popular Movie Picks</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSuggestion;
