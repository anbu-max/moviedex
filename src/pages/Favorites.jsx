import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";


function Favorites() {
  const { favorites } = useMovieContext();

  if(favorites){
    return (
    <div className="favorites">
      <h2>Your Favorite Movies</h2>
      <div className="favorites-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>  
    );
  }


  return <div className="favorites-empty">
    <h2>No favs added</h2>
    <p>Try adding adding fav movies</p>
  </div>
}

export default Favorites;