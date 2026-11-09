import React, { useState } from "react";

const SearchBar = ({onSearch}) => {
  const[term, setTerm] =useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}
      className="flex gap-2 justify-center mb-4"
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="input input-success w-full max-w-xs my-6"
        />
        <button type="submit" className="btn btn-success">Search</button>
      </form>
    </div>
  )
}

export default SearchBar
