const pokemonController = require("./controllers/pokemonController");

const routes = {
  GET: {
    "/": pokemonController.createOnePokemon,
    "/team": pokemonController.createTeamPokemon,
    "default": pokemonController.createOnePokemon,
  },
  "undefinedMethod": pokemonController.undefinedMethod
};

module.exports = { routes };
