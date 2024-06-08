import { useState, useEffect } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    setIsError(false);
    let cancel;
    axios({
      url: `https://openlibrary.org/search.json?title=${query}&page=${pageNumber}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        const data = response.data.docs.map((book) => book.title);
        setBooks((preBooks) => {
          return [...new Set([...preBooks, ...data])];
        });
        setHasNextPage(data.length > 0);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        setIsError(true);
      });

    return () => {
      cancel();
    };
  }, [query, pageNumber]);

  return { isLoading, isError, books, hasNextPage };
}
