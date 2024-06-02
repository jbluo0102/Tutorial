import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./component/PokemonList";
import Pagination from "./component/Pagination";

const INNITIAL_URL = "https://pokeapi.co/api/v2/pokemon";

function App() {
  // Pokemons state
  const [pokemons, setPokemons] = useState([]);

  // Page state
  const [currentPage, setCurrentPage] = useState(INNITIAL_URL);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");

  function setToNextPage() {
    setCurrentPage(nextPage);
  }
  function setToPrevPage() {
    setCurrentPage(prevPage);
  }

  useEffect(() => {
    let cancel = false;
    axios
      .get(currentPage, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log("Fectch data: ", res.data);
        setPokemons(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      });

    return () => {
      cancel();
    };
  }, [currentPage]);

  return (
    <div>
      <PokemonList pokemons={pokemons} />
      <Pagination
        setToPrevPage={prevPage ? setToPrevPage : null}
        setToNextPage={nextPage ? setToNextPage : null}
      />
    </div>
  );
}

export default App;
