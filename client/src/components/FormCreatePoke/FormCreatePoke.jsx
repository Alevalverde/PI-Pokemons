import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./forCreatePoke.css"

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const mapToTypes = useSelector((state) => state.types);
  const history = useHistory();
  const types = mapToTypes.map((e) => e.name);
  console.log("esto imprimo ==> ", types);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    spriteSrc: "",
    types: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    console.log(input);
  }

  function handleSubmit(e) {
    //console.log(input);
    (e).preventDefault()
    if (!input.name) return alert("Debe colocar un nombre para poder seguir");
    else if (!input.hp || input.hp < 0) return alert("Debe colocar puntos de vida validos para seguir");
    else if (!input.attack || input.attack < 0) return alert("Debe colocar puntos de fuerza validos para poder seguir");
    else if (!input.defense || input.defense < 0) return alert("Debe colocar puntos de defensa validos para poder seguir");
    else if (!input.speed || input.speed < 0) return alert("Debe colocar puntos de velocidad validos para poder seguir");
    else if (!input.height || input.height < 0) return alert("Debe colocar una altura valida para poder seguir");
    else if (!input.weight || input.weight < 0) return alert("Debe colocar peso valido para poder seguir");
    else if (!input.spriteSrc) return alert("Debe colocar una dirección para poder cargar la imagen");
    else if (!input.types.length) return alert("Debe colocar al menos un tipo de Pokemon");
    dispatch(postPokemon(input));
    
    alert("¡El pokemon fue creado con éxito!");

    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      spriteSrc: "",
      types: [],
    });
    history.push("/home");
  }


  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className="fondo">
      <Link to="/home">
        <button>VOLVER ATRAS</button>
      </Link>
    <div className="fondo2"></div>
      <h1 className="titleForm">¡Crea tu propio Pokemon!</h1>

      <form className="formulario" on onSubmit={(e) => handleSubmit(e)}>
        <div >
          <label>Nombre: </label>{" "}
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Vida: </label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Fuerza: </label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Defensa: </label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Velocidad: </label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Altura: </label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Peso: </label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Imagen: </label>
          <input
            type="text"
            value={input.spriteSrc}
            name="spriteSrc"
            onChange={handleChange}
          />
        </div>

        <select onChange={(e) => handleSelect(e)}>
          {types.map((t) => (
            <option value={t}>{t}</option>
          ))}
        </select>

        <p className="cajaTypes">
          <p>{input.types.map((el) => el + " ")}</p>
        </p>

        <br />

        <button type="submit"> Crear Pokemon </button>
      </form>
    </div>
  );
}
