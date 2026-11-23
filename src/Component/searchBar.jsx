import { useState } from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  const [term, setTerm] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  const handleClear = () => {
    setTerm("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="mb-4 flex w-full flex-nowrap items-center justify-center gap-2">
      <input
        type="text"
        placeholder="Search movies..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Search movies"
        className="input input-success min-w-0 flex-1"
      />
      {term && (
        <button type="button" className="btn btn-ghost shrink-0" onClick={handleClear} aria-label="Clear search">
          Clear
        </button>
      )}
      <button type="submit" className="btn btn-success shrink-0">Search</button>
    </form>
  )
}

export default SearchBar
