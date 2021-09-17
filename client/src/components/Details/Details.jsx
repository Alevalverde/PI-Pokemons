import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import { useEffect } from "react";
import "./details.css";

export default function Details(props) {
  //console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <>
      <div>
        <div className="title1">
          <h1>Poke Card</h1>
        </div>
        <div>
            {myPokemon.length > 0 ? (
              <h2>Atributos de: {myPokemon[0].name.toUpperCase()}</h2>
            ) : (
              <p>Cargando...</p>
            )}
          
        </div>
        <div className="container">
          {myPokemon.length > 0 ? (
            <div className="card">
              <img className="img" src={myPokemon[0].spriteSrc} />
              <h2 className="boxTypes">Tipo: {" " + myPokemon[0].types + " "}</h2>              
              <p className="boxContainer">
              <div className="box1">
              <h3>Fuerza: {myPokemon[0].attack}</h3>
              <h3>Defensa: {myPokemon[0].defense}</h3>
              <h3>Velocidad: {myPokemon[0].speed}</h3>
              </div>
              <div className="box2">
              <h3>Vida: {myPokemon[0].hp}</h3>
              <h3>Peso: {myPokemon[0].weight}</h3>
              <h3>Altura: {myPokemon[0].height}</h3>
              </div>
              </p>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
        <Link to="/home">
          <button>Volver Atras</button>
        </Link>
      </div>
    </>
  );
}
