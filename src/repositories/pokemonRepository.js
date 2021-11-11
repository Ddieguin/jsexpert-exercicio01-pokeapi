const fs = require("fs");
const { join } = require("path");

class PokemonRepository {

  #pathRepository
  
  constructor(path) {
    this.#pathRepository = path ? join(__dirname, path) : join(__dirname, "..", "/database", "pokemons.json");
  }
  /**
   * 
   * @returns ([ { name:"...", moves:[..., ..., ...]}, ...]) reference at Pokemon
   */
  readFile() {
    return JSON.parse(fs.readFileSync(this.#pathRepository));
  }

  /**
   * @returns (void) 
   * @param {ArrayOfPokemons} content [ { name:"...", moves:[..., ..., ...]}, ...]
   */
  writeFile(content) {
    fs.writeFileSync(this.#pathRepository, JSON.stringify(content))
  }  
}

module.exports = new PokemonRepository();
