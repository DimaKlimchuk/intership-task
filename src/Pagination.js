import React from 'react';

const Pagination = ({
  numbers,
  currentPage,
  prePage,
  changeCurrentPage,
  nextPage,
}) => {
  return (
    <nav>
      <ul className="pages">
        <li className="page-item">
          <a href="#" className="page-link" onClick={prePage}>
            Prev
          </a>
        </li>
        {numbers.map((number, index) => (
          <li
            className={`page-item ${currentPage === number ? 'active' : ''}`}
            key={index}
          >
            <a
              href="#"
              className="page-link"
              onClick={() => changeCurrentPage(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="#" className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
