import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_DB_API_KEY;

  // Minimal change: unified fetch that gets 2 pages (up to 20 movies)
  const fetchMovies = async (searchTerm) => {
    try {
      const res1 = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=1`);
      const data1 = await res1.json();

      const res2 = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=2`);
      const data2 = await res2.json();

      return [...(data1.Search || []), ...(data2.Search || [])];
    } catch (err) {
      console.error("Error fetching movies:", err);
      return [];
    }
  };

  // Home / popular movies
  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await fetchMovies("batman"); // default popular movies
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load Movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Search handler (minimal change)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await fetchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search Movies..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies.."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading.....</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;