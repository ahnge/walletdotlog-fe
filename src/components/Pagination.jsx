import React from "react";
import usePagination from "../utils/usePagination";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  // pagination
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="btn-group mx-auto">
      {/* Left navigation arrow */}
      <li
        className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
        onClick={onPrevious}
      >
        «
      </li>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === "DOTS") {
          return (
            <li className="btn" key={i}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={`btn ${currentPage === pageNumber ? "btn-active" : ""}`}
            key={i}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`btn ${currentPage === lastPage ? "btn-disabled" : ""}`}
        onClick={onNext}
      >
        »
      </li>
    </ul>
  );
};

export default Pagination;
