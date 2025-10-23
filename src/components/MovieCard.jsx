import "../css/MovieCard.css"
import { useMovieContext} from "../contexts/MovieContext";


function MovieCard({ movie }) {

  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id)



  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);

  }
  return (
    <div className="movie-card">
      <div className="movie-poster">  
        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} alt={movie.Title} />
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-year">{movie.release_date?.split("-")[0]}</p>   
      </div>
    </div>
  );
}

export default MovieCard;
