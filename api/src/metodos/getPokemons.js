const { Op } = require("sequelize");
const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Pokemon, Types } = require("../db");

/*
GET /pokemons:
Obtener un listado de los pokemons desde pokeapi.
Debe devolver solo los datos necesarios para la ruta principal (imagen, nombre, tipo)
*/
const getPokemons = async () => {
  const apiUrl1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const apiPokemon1 = await apiUrl1.data.results;
  const apiUrl2 = apiUrl1.data.next;
  const apiUrl2a = await axios.get(apiUrl2);
  const apiPokemon2 = apiUrl2a.data.results;
  // concateno y los guardo en un solo objeto
  const allPokemonsApi = [...apiPokemon1, ...apiPokemon2];
  //Traer info pokemon ---> id, nombre, tipo, img, atributos(vida, fuerza, defensa, velocidad, altura, peso)
  const pokemonsInfo = [];
  for (let i = 0; i < allPokemonsApi.length; i++) {
    const { url } = allPokemonsApi[i];
    const { data } = await axios.get(url);
    pokemonsInfo.push({
      id: data.id,
      name: data.name,
      spriteSrc: data.sprites.other.dream_world.front_default,
      types: data.types, //preguntar si tengo que especificar más el type!!!
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      hp: data.stats[0].base_stat,
      weight: data.weight,
      height: data.height,
    });
  }
  return pokemonsInfo;
};

const getDbAllInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getPokeTotal = async () => {
  const api = await getPokemons();
  const dbase = await getDbAllInfo();
  const infoTotal = [...api, ...dbase];
  return infoTotal;
};

module.exports = { getPokeTotal };
