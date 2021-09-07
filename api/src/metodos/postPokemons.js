const { Op } = require("sequelize");
const axios = require("axios");
const { Router } = require("express");
const router = Router();
// const { Pokemon, Types } = require("../db");

/*
 POST /pokemons:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
Crea un pokemon en la base de datos */

// router.post("/pokemons", async (req, res) => {
//   const {
//     name,
//     spriteSrc,
//     attack,
//     defense,
//     speed,
//     hp,
//     weight,
//     height,
//     type,
//     createdInDb,
//   } = req.body;

//   const pokemonCreated = await Pokemon.create({
//     name,
//     spriteSrc,
//     attack,
//     defense,
//     speed,
//     hp,
//     weight,
//     height,
//   });
//   const typesDb = await Types.findAll({
//     where: { name: type },
//   });

//   pokemonCreated.addTypes(typesDb);
//   res.send("SUCCESSFUL CREATION OF POKEMON");
// });

module.exports = router;
