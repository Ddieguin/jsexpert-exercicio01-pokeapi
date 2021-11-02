const fs = require("fs");
const path = require("path");

class PokemonRepository {

  #Pokemons

  constructor() {
    this.#Pokemons = JSON.parse(
       fs.readFileSync(
        path.join(__dirname, "..", "/database", "pokemons.json")
      ));
  }

  async readThreePokemons() {
  
    const team = [];

    while (team.length < 3) {
      const indexRandom = Math.floor(Math.random() * this.#Pokemons.length);
      if (!team.includes(this.#Pokemons[indexRandom])) {
        team.push(this.#Pokemons[indexRandom]);
      }
    }

    return team;
  }

  async readOnePokemon() {
      const indexRandom = Math.floor(Math.random() * this.#Pokemons.length);
      return [this.#Pokemons[indexRandom]];
  }
}

module.exports = new PokemonRepository();
