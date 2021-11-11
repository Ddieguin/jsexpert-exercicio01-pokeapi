const pokemonService = require("../service/pokemonService");

class PokemonController {
  async createTeamPokemon(req, res) {
    const response = await pokemonService.getThreeDistinctPokemons();
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    return res.end(JSON.stringify(response));
  }

  async createOnePokemon(req, res) {
    const response = await pokemonService.getOnePokemon();
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    return res.end(JSON.stringify(response));
  }

  async undefinedRoute(req, res) {
    return this.createOnePokemon(req, res);
  }

  async undefinedMethod(req, res) {
    res.statusCode = 404;
    return res.end();
  }
}

module.exports = new PokemonController();
