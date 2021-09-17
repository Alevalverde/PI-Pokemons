const initialState = {
  pokemonsCopy: [],
  pokemons: [],
  types: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload,
      };

    case "FILTER_BY_TYPES":
      if(action.payload === "all"){
        const all = state.pokemonsCopy;
        return{
          ...state,
          pokemons: all,
        }
      }
      const pokemonsFilter = state.pokemonsCopy.filter((e) =>
        e.types?.includes(action.payload)
      );
      return {
        ...state,
        pokemons: pokemonsFilter,
      };

    case "GET_NAME_POKE":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "FILTER_CREATED":
      const allPokemonsF = state.pokemonsCopy;
      let createdFilter = [];
      if (action.payload === "api") {
        createdFilter = allPokemonsF.filter((e) => !e.createdInDb);
      } else if (action.payload === "created") {
        createdFilter = allPokemonsF.filter((e) => e.createdInDb);
      } else if (action.payload === "all") {
        createdFilter = allPokemonsF;
      }
      return {
        ...state,
        pokemons: createdFilter,
      };

      case "ORDER_BY_NAME":
        const pokes1 = state.pokemons;
        let arrayOrderName =
          action.payload === "ascendent"?
          pokes1.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            : pokes1.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name < a.name) return 1;
                return 0;
              });
        return {
          ...state,
          pokemons: arrayOrderName,
        };

      

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };


    default:
      return state;
  }
}

export default rootReducer;
