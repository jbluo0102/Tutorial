import React from "react";

export default function PokemonList({ pokemons }) {
  return (
    <div>
      {pokemons.map((pokemon, index) => {
        return <div key={index}>{pokemon.name}</div>;
      })}
    </div>
  );
}
