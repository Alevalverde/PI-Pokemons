import React from "react";
import "./paginado.css";

export default function Paginado({ pokePerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  const bucle = Math.ceil(allPokemons / pokePerPage);
  for (let i = 1; i <= bucle; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <nav className="number" key={number}>
              <nav className="inToNumber">
                <a href onClick={() => paginado(number)}>
                  {number}
                </a>
              </nav>
            </nav>
          ))}
      </ul>
    </div>
  );
}
