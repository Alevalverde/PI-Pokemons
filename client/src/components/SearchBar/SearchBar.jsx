import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePoke } from "../../actions";
import "./searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    //console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePoke(name));
  }

  return (
    <div className="barraCaja">
      <input
        className="barra"
        type="text"
        placeholder="Buscar Pokemon..."
        onChange={(e) => handleInputChange(e)}
      />
      <br />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        BUSCAR
      </button>
    </div>
  );
}
