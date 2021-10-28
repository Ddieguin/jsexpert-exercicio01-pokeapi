const pokemonRepository = require("../repository/pokemonRepository");

const routes = {
  "/": async (req, res) => {
    //GET
    const results = await pokemonRepository.read();
    return res.end(JSON.stringify(results[Math.floor(Math.random() * results.length)]));
  },
  "/team": async (req, res) => {
    //GET
    const results = await pokemonRepository.read();
    const threePokemons = [];

    while (threePokemons.length < 3) {
      const indexRandom = Math.floor(Math.random() * results.length);
      if (!threePokemons.includes(results[indexRandom])) {
        threePokemons.push(results[indexRandom]);
      }
    }
    return res.end(JSON.stringify(threePokemons));
  },
  //to routes undefined
  default: (req, res) => {
    return routes["/"](req, res); //routes default
  },
};

module.exports = { routes };
