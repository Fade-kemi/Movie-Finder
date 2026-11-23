import { useEffect, useRef } from "react";

const MovieDetailsModal = ({ movie, loading, onClose, isFavorite, onToggleFavorite }) => {
  const closeButton = useRef(null);
  const closeHandler = useRef(onClose);

  useEffect(() => {
    closeHandler.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeHandler.current();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    closeButton.current?.focus();
  }, [loading]);

  if (loading || !movie) {
    return (
      <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="movie-loading-title">
        <div className="modal-box flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg flex-col items-center gap-4 bg-base-100 p-6 text-center shadow-xl">
          <h2 id="movie-loading-title" className="text-xl font-bold">Loading movie details</h2>
          <span className="loading loading-spinner loading-lg text-primary" aria-label="Loading" />
          <button ref={closeButton} type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
        </div>
        <button type="button" className="modal-backdrop" aria-label="Close movie details" onClick={onClose} />
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  const director = movie.credits?.crew?.find((person) => person.job === "Director")?.name;
  const cast = movie.credits?.cast?.slice(0, 10) ?? [];
  const year = movie.release_date?.slice(0, 4) || "N/A";

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="movie-title">
      <div className="modal-box max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto bg-base-100 p-5 shadow-xl sm:p-8">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="mx-auto max-h-80 w-auto rounded-lg object-contain sm:mx-0 sm:max-h-[32rem] sm:w-full"
          />
          <div className="text-left">
            <h2 id="movie-title" className="mb-2 text-2xl font-bold">{movie.title}</h2>
            {movie.tagline && <p className="mb-3 italic opacity-75">{movie.tagline}</p>}
            <div className="space-y-3">
              <p className="leading-relaxed">{movie.overview || "No overview available."}</p>
              <p><span className="font-semibold">Year:</span> {year}</p>
              <p><span className="font-semibold">Release date:</span> {movie.release_date || "N/A"}</p>
              <p><span className="font-semibold">Rating:</span> {movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : "N/A"}</p>
              <p><span className="font-semibold">Genres:</span> {movie.genres?.map((genre) => genre.name).join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Runtime:</span> {movie.runtime ? `${movie.runtime} minutes` : "N/A"}</p>
              <p><span className="font-semibold">Director:</span> {director || "N/A"}</p>
              <p>
                <span className="font-semibold">Cast:</span>{" "}
                {cast.length ? cast.map((person) => person.name).join(", ") : "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onToggleFavorite} className={`btn ${isFavorite ? "btn-error" : "btn-secondary"}`}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <button ref={closeButton} type="button" className="btn btn-outline btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
      <button type="button" className="modal-backdrop" aria-label="Close movie details" onClick={onClose} />
    </div>
  )
}

export default MovieDetailsModal;
