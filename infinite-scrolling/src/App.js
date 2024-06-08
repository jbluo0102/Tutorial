import "./App.css";
import { useState } from "react";
import useBookSearch from "./component/BookSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, books, hasNextPage } = useBookSearch(
    query,
    pageNumber
  );

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    if (!inputValue) {
      return;
    }
    setQuery(inputValue);
    setPageNumber(1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search it!!"
        value={query}
        onChange={handleSearch}
      ></input>
      {books.map((book) => {
        return <div key={book}>{book}</div>;
      })}

      <div>{query && isLoading && "Loading..."}</div>
      <div>{query && isError && "Error"}</div>
    </div>
  );
}

export default App;
