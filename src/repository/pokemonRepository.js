const fs = require('fs/promises');
const path = require('path');


class PokemonRepository {

    async read() {
       const results = JSON.parse(await fs.readFile(path.join(__dirname, "..", "/database", "pokemons.json")));
       return results;
    }

}


module.exports = new PokemonRepository();