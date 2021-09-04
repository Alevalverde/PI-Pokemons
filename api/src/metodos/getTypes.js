const { Op } = require("sequelize");
const axios = require("axios");
const { Router } = require("express");
const server = Router();

/* 
GET /types:
Obtener todos los tipos de pokemons posibles
En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí*/

server.get("/", async (req, res) => {
	try {
	  const getTypes = await axios.get("https://pokeapi.co/api/v2/type");
	  const allTypes = getTypes.data.results;
	  //console.log(allTypes);
	  res.status(200).json(allTypes);
	} catch (error) {
	  res.status(400).send(error);
	}
  });





module.exports = server;
