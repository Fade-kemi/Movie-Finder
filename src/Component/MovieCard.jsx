const MovieCard = ({ movie, onToggleFavorite, isFavorite, onViewDetails }) => {
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://via.placeholder.com/500x750?text=No+Image`;
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-lg m-4">
      <img className="w-full h-96 object-cover  group-hover:scale-110"
       src={posterUrl}
        alt={movie.title} />

        {/* overlay */}
    <div className = "absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">  
      <h3 className="text-lg font-bold text-center my-2">{movie.title}</h3>
      <p className="text-gray-600 mb-4 text-center">{movie.release_date ? movie.release_date.substring(0,4) : "N/A"}</p>

      <div className="flex justify-center gap-4 my-4">
        <button className="btn btn-sm btn-primary" onClick={() => onViewDetails(movie.id)}>
          Details
        </button>
        <button onClick={() => onToggleFavorite(movie)}
         className={`btn btn-sm ${isFavorite ? "btn-error" : "btn-secondary"}`}>{isFavorite ? "Remove" : "Favorite"}</button>
      </div>
      </div>  
    </div>
  )
}

export default MovieCard
