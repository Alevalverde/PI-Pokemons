import React from "react";
import "./card.css"

export default function Card({ name, image, type }) {
  //console.log(type)
  return (
    <div className="cardPoke">
      <h3>{name = name[0].toUpperCase()+name.slice(1) }</h3>
      <img className="imgCard" src={image} alt="img not found"/>
      <h3>Tipo de Pokemon: </h3>
      <>{type?.map(e=> <span>{e + " "}</span> )}</>
    </div>
  );
}