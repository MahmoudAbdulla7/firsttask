import React from 'react'


export default function Pagination({ totalContacts, paginate ,currentPage}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalContacts / 2); i++) {
      pageNumbers.push(i);
    }
  return (
    <>
   <nav>
      <ul className="pagination justify-content-end">
        {currentPage > 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
            <i className="fa-solid fa-chevron-left"></i>
            </button>
          </li>
        )}

        {pageNumbers.slice(currentPage,currentPage+2).map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        {currentPage < pageNumbers.length && (
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
            <i className="fa-solid fa-chevron-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  </>
  )
}
