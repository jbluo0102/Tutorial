import React from "react";

export default function Pagination({ setToPrevPage, setToNextPage }) {
  return (
    <div>
      <button onClick={setToPrevPage} disabled={!setToPrevPage}>
        Previous
      </button>
      <button onClick={setToNextPage} disabled={!setToNextPage}>
        Next
      </button>
    </div>
  );
}
