import {useState, useEffect} from 'react'
import SearchBar from './Component/searchBar'
import Spinner from './Component/Spinner'
import ErrorMessage from './Component/ErrorMessage'
import MovieCard from './Component/MovieCard'
import Pagination from './Component/Pagination'
import MovieDetailsModal from './Component/MovieDetailsModal'

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState("search");


  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, initialized]);

  useEffect(() => {
    if (view === "favorites") {
      setMovies([]);
      return;
    } 
    const fetchMovies = async () => {
      if (!API_KEY) {
        setMovies([]);
        setTotalPages(0);
        setError("TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file and restart the dev server.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const endpoint = searchTerm.trim() ? "search/movie" : "movie/popular";
        const params = new URLSearchParams({ api_key: API_KEY, page: String(page) });
        if (searchTerm.trim()) params.set("query", searchTerm.trim());

        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?${params}`);
        if (!response.ok) throw new Error("TMDB request failed");
        const data = await response.json();
        setMovies(data.results ?? []);
        setTotalPages(data.total_pages ?? 0);
      } catch (err) {
        setMovies([]);
        setTotalPages(0);
        setError("Could not load movies. Check your connection and TMDB API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, view, page]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages)
       {setPage (newPage)}
  }

  const openModel = async (movieId) => {
    setError(null);
    try { 
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch movie details");
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      setError ("Failed to fetch movie details.");
    }
  }

  const closeModel = () => setSelectedMovie(null);

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      const  favoriteMovie = {
        id:movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        overview: movie.overview,
        vote_average: movie.vote_average,
      }
      setFavorites([...favorites, favoriteMovie]);
    }
  }
  const isFavorite = (movie) => favorites.some((fav) => fav.id === movie.id);

  const displayedMovies =view === "search" ? movies : favorites;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-center my-4 drop-shadow-2xl">Movie Finder</h1>
      <div className="tabs tabs-border mb-6">
        <button type="button" className={`tab text-lg ${view === "search" ? "tab-active" : ""}`}
        onClick={() => {
          setView("search");
          setPage(1);
        }}>Search</button>

        <button type="button" className={`tab text-lg ${view === "favorites" ? "tab-active" : ""}`}
         onClick={() => {
           setView("favorites");
         }}>
          Favorites ({favorites.length})
        </button>
      </div>
      {view === "search" && (
        <div className="w-full max-w-md mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
        </div>
      )}
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && displayedMovies.length === 0 && (
        <div>
          no movies found.{" "}
          {view === "favorites" 
          ? "Add some favorites to see them here."
           : "Try searching for a different movie."}
        </div>
      )}
      {!loading && !error && displayedMovies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id}
           movie={movie} 
           onToggleFavorite = {toggleFavorite}
           isFavorite = {isFavorite(movie)}
           onViewDetails = {openModel}
           />
        ))}
        </div>
      )}

      {view === "search" && totalPages > 1 && !loading && (
        <div className = " mt-6">
          <Pagination currentPage = {page} totalPages = {totalPages} onPageChange = {handlePageChange} />
        </div>
      )}

      {selectedMovie && (
        <MovieDetailsModal 
        movie={selectedMovie} 
        onClose={closeModel}
        isFavorite = {isFavorite(selectedMovie.id)}
         onToggleFavorite= {() => toggleFavorite(selectedMovie)} />
      )}
    </div>
  )
}

export default App
