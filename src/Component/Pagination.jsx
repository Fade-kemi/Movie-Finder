import React from 'react'

function Pagination({ currentPage, totalPages, onPageChange }) {
    const range = 3; //number of pages to show on each side of the current page//

    const startPage = Math.max (1, currentPage - range);
    const endPage = Math.min (totalPages, currentPage + range);
    const pages = Array.from ({length:endPage - startPage + 1 }, (_, i) => startPage + i );

 

  return (
    <div className="flex justify-center mt-4 gap-1 flex-wrap ">
      <button
        className="btn btn-outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {startPage > 1 && <button className='btn btn-disabled'>....</button>}
      {pages.map((page) => (
        <button className = {`btn ${page === currentPage ? "btn-primary" : ""}`}
         key ={page}
         onClick={() => onPageChange(page)}
         >
            {page}
        </button>
      ))}

      {endPage < totalPages && <button className = "btn btn-disabled">....</button>}

      <button className = "btn" 
      disabled = {currentPage === totalPages}
      onClick = {() => onPageChange(currentPage + 1)} >
       Next
      </button>


    </div>
  );
}

export default Pagination;
