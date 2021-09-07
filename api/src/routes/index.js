const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { getPokeTotal } = require("../metodos/getPokemons");
const { getTypesAll } = require("../metodos/getTypes");

//--------GET--------\\

//Configuración para solicitar name con Query
router.get("/pokemons", async (req, res) => {
  const name = req.query.name;
  const pokeTotal = await getPokeTotal();
  if (name) {
    let pokeName = pokeTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    pokeName.length
      ? res.status(200).send(pokeName)
      : res.status(404).send("POKEMON NOT FOUND");
  } else {
    res.status(200).json(pokeTotal);
  }
});

//Configuración para solicitar por id 
router.get("/pokemons/:id", async (req, res) => {
  const id = req.params.id;
  const allPokeId = await getPokeTotal();
  if (id) {
    let pokeId = allPokeId.filter((el) => el.id == id);
    pokeId.length
      ? res.status(200).json(pokeId)
      : res.status(404).send("POKEMON-ID NOT FOUND");
  }
});

//Ruta para los types
router.get("/types", async (req, res) => {
  const nameTypes = await getTypesAll();
  res.send(nameTypes);
});


//--------POST--------\\

const { Pokemon, Types } = require("../db");

router.post("/pokemons", async (req, res) => {
  const {
    name,
    spriteSrc,
    attack,
    defense,
    speed,
    hp,
    weight,
    height,
    type,
    createdInDb,
  } = req.body;

  const pokemonCreated = await Pokemon.create({
    name,
    spriteSrc,
    attack,
    defense,
    speed,
    hp,
    weight,
    height,
  });
  const typesDb = await Types.findAll({
    where: { name: type },
  });

  pokemonCreated.addTypes(typesDb);
  res.send("SUCCESSFUL CREATION OF POKEMON");
});

module.exports = router;
