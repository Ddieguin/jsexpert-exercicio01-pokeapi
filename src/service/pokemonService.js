const pokemonRepository = require("../repositories/pokemonRepository")

class PokemonService {
  #pokemonsCollections;

  constructor(pokemonRepository) {
    this.#pokemonsCollections = pokemonRepository.readFile();
  }
 
  /**
   * 
   * @returns [(3){ name:"...", moves:[..., ..., ...]}]
   */
  async getThreeDistinctPokemons() {
    const pokemons = [];

    while (pokemons.length < 3) {
      const indexRandom = this.generateIndexPokemon();

      if (!pokemons.includes(this.#pokemonsCollections[indexRandom])) {
        pokemons.push(this.#pokemonsCollections[indexRandom]);
      }
    }
    return pokemons;
  }
 
  /**
   * 
   * @returns [(1){ name:"...", moves:[..., ..., ...]}]
   */
  async getOnePokemon() {
    const indexRandom = this.generateIndexPokemon();
    return [this.#pokemonsCollections[indexRandom]];
  }


  generateIndexPokemon() {
    return Math.floor(Math.random() * this.#pokemonsCollections.length); 
  }

}

module.exports = new PokemonService(pokemonRepository);
