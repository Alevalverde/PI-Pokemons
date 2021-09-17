import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByTypes,
  filterCreated,
  filterOrder,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokePerPage] = useState(9);
  const [Order, setOrder] = useState("");
  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const currentPoke = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterType(event) {
    event.preventDefault();
    dispatch(filterPokemonsByTypes(event.target.value));
  }

  function handleFilterCreated(event) {
    dispatch(filterCreated(event.target.value));
  }

  function handleOrder(event) {
    dispatch(filterOrder(event.target.value));
    setCurrentPage(1);
    setOrder(`${event.target.value}`);
  }

  return (
    <div>
      <div>
        <div className="title">
          <h1>Poke Home</h1>
        </div>
        <div>
          <a href="https://www.pokemon.com/el/" target="_blank">
        <img
          className="logPoke"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1920px-International_Pok%C3%A9mon_logo.svg.png"
          alt="Logo Pokemon"
        />
        </a>
        </div>
        <Link to="/pokemon">
          <img
            className="logoBall"
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
            alt="Poke Ball"
          />
        </Link>
        <p className="titleCreate">¡Crea tu propio Pokemon!</p>
        <SearchBar />
        <Paginado
          pokePerPage={pokePerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Cargar todos los pokemones
        </button>
        <br />
      </div>
      <div>
        <div className="cajaSelects">
          
          <select onChange={(event) => handleOrder(event)}>
            <option value="ascendent">Ascendente</option>
            <option value="descendent">Descendente</option>
          </select>
        

          <select onChange={(event) => handleFilterType(event)}>
            <option value="all">Todos</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
            <option value="unknown">Unknown</option>
            <option value="shadow">Shadow</option>
          </select>

          <select onChange={(event) => handleFilterCreated(event)}>
            <option value="all">Todos</option>
            <option value="created">Creados en DB</option>
            <option value="api">Provenientes de la API</option>
          </select>
        </div>

        <div className="cards">
          {currentPoke?.map((el) => {
            return (
              <div className="cardsHome" key={el.id}>
                <Link to={"/home/" + el.id}>
                  <Card name={el.name} image={el.spriteSrc} type={el.types} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/">
        <button>Volver al Inicio</button>
      </Link>
    </div>
  );
}
