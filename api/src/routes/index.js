const { Router } = require("express");
const server = Router();
const getPokemons = require("../metodos/getPokemons.js");
const getTypes = require("../metodos/getTypes.js");
const getId = require("../metodos/getId");
const postPokemon = require("../metodos/postPokemons.js");

//Enrutado

server.use("/pokemons", getPokemons);
server.use("/types", getTypes);
server.use("/id", getId);
server.use("/newpokemon", postPokemon);

module.exports = server;
