const MovieCard = ({ movie, onToggleFavorite, isFavorite, onViewDetails }) => {
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://via.placeholder.com/500x750?text=No+Image`;
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-lg m-4">
      <img className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
       src={posterUrl}
        alt={movie.title} />

    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-white opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
      <h3 className="my-2 text-center text-lg font-bold">{movie.title}</h3>
      <p className="mb-4 text-center">{movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}</p>

      <div className="my-4 flex flex-wrap justify-center gap-4">
        <button type="button" className="btn btn-sm btn-primary" onClick={() => onViewDetails(movie.id)}>
          Details
        </button>
        <button type="button" aria-pressed={isFavorite} aria-label={`${isFavorite ? "Remove" : "Add"} ${movie.title} ${isFavorite ? "from" : "to"} favorites`} onClick={() => onToggleFavorite(movie)}
         className={`btn btn-sm ${isFavorite ? "btn-error" : "btn-secondary"}`}>{isFavorite ? "Remove" : "Favorite"}</button>
      </div>
      </div>  
    </div>
  )
}

export default MovieCard
