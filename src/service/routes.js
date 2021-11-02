const pokemonRepository = require("../repository/pokemonRepository");

const routes = {
  GET: {
    "/": async (req, res) => {
      //GET
      const results = await pokemonRepository.readOnePokemon();
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      return res.end(JSON.stringify(results));
    },
    "/team": async (req, res) => {
      //GET
      const results = await pokemonRepository.readThreePokemons();
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      return res.end(JSON.stringify(results));
    },
    default: (req, res) => {
      return routes["GET"]["/"](req, res); //routes default
    },
  },
  //route undefined to PUT/DELETE/POST/PATCH
  undefined: (req, res) => {
    res.statusCode = 404;
    return res.end();
  },
};

module.exports = { routes };
