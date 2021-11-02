const pokemonRepository = require("../repository/pokemonRepository");

const routes = {
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
  //to routes undefined
  default: (req, res) => {
    return routes["/"](req, res); //routes default
  },
};

module.exports = { routes };
