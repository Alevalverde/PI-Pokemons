const { Op } = require("sequelize");
const axios = require("axios");
const { Router } = require("express");
const server = Router();

/*
GET /pokemons:
Obtener un listado de los pokemons desde pokeapi.
Debe devolver solo los datos necesarios para la ruta principal (imagen, nombre, tipo)
*/

// server.get("/", async (req, res) => {
//   try {
//     const getPokemons = await axios.get(
//       "https://pokeapi.co/api/v2/pokemon?offset=00&limit=40"
//     ); // <-- Preguntar si puedo traer por query no es un endpoint autorizado
//     const results = getPokemons.data.results;
//     const pokemones = [];
//     for (let i = 0; i < results.length; i++) {
//       pokemones.push(results[i]);
//     }

//     const pokemon = await axios.get()

//     for (let i = 0; i < pokemones.length; i++) {
//       pokemon += pokemones.url[i];

//     }

//     res.json(pokemones);
//   } catch (error) {}
//   {
//     res.status(400).send(error);
//   }
// });

server.get("/", async (req, res) => {
  //const name = req.query.name;
  try {
    //Hago un request y subrequest de los 40 pokemones
    const apiPokemonUrl1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const apiPokemon1 = await apiPokemonUrl1.data.results;
    const apiPokemonUrl2 = apiPokemonUrl1.data.next;
    const apiPokemonUrl2a = await axios.get(apiPokemonUrl2);
    const apiPokemon2 = await apiPokemonUrl2a.data.results;
    // concateno y los guardo en un solo objeto
    const allPokemons = [...apiPokemon1, ...apiPokemon2];

    const UrlPokes = await allPokemons.map((el) => {
      return {
        urlPoke: el.url,
      };
      

    });

    //res.json(UrlPokes)
  } catch (err) {
    return res.status(404).send(err);
  }
});

// const pokemons = apiPokemon.data.results;

// let response = [];
// if (name) {
//   try {
//     let pok = await Pokemon.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `${name}`,
//         },
//       },
//     });
//     return res.status(200).json(pok);
//   } catch (err) {
//     return res.send("No existe ese Pokemon ");
//   }
// }
// for (let i = 0; i < pokemons.length; i++) {
//   const { url } = pokemons[i];
//   const { data } = await axios.get(url);
//   response.push({
//     name: data.name,
//     attack: data.stats[1].base_stat,
//     defense: data.stats[2].base_stat,
//     speed: data.stats[5].base_stat,
//     hp: data.stats[0].base_stat,
//     weight: data.weight,
//     height: data.height,
//     types: data.types,
//     spriteSrc: data.sprites.other.dream_world.front_default,
//   });
// }
// for (let j = 0; j < response.length; j++) {
//   let [poke, create] = await Pokemon.findOrCreate({
//     where: {
//       name: response[j].name,
//       attack: response[j].attack,
//       defense: response[j].defense,
//       speed: response[j].speed,
//       hp: response[j].hp,
//       height: response[j].height,
//       weight: response[j].weight,
//       spriteSrc: response[j].spriteSrc,
//     },
//   });
//   for (let i = 0; i < response[j].types.length; i++) {
//     let type = await Type.findOne({
//       where: { name: response[j].types[i].type.name },
//     });
//     await poke.addType(type.dataValues.id);
//     console.log(type.dataValues.id);
//     // console.log("creado : ",create)
//   }
// }
// let pokes = await Pokemon.findAll({ include: { model: Type } });
// return res.json(pokes);

module.exports = server;
