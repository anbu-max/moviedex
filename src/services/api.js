 // Replace with your key// api.js
const API_KEY = import.meta.env.VITE_DB_API_KEY;

export const getMovies = async () => {
  try {
    const res = await fetch(`https://api.example.com/movies?apikey=${API_KEY}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

const BASE_URL = import.meta.env.VITE_DB_BASE_URL;
/**
 * Fetch popular movies
 * OMDb doesn’t have a “popular” endpoint,
 * so we’ll just show a default search (e.g., Batman)
 */
export async function getPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=spider`);
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search; // array of movies with Title, Year, Poster, imdbID
    } else {
      console.error("OMDb Popular fetch failed:", data.Error);
      return [];
    }
  } catch (err) {
    console.error("Error fetching popular movies:", err)
    return [];
  }
}

/**
 * Search movies by title
 */
export async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search; // array of movies
    } else {
      console.error("OMDb Search failed:", data.Error);
      return [];
    }
  } catch (err) {
    console.error("Error searching movies:", err);
    return [];
  }
}