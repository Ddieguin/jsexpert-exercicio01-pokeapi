const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

(async () => {
  const {
    data: { results: pokemons },
  } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  const arrayOfPokemons = await fillPokemons(pokemons);
  await writePokemonsInFile(arrayOfPokemons);
  eventEmitter.emit("start");
})();

async function writePokemonsInFile(content) {
  await fs.writeFile(
    path.join(__dirname, "/src", "/database", "pokemons.json"),
    JSON.stringify(content)
  );
}

async function fillPokemons(results) {
  const pokemons = await Promise.all(
    results.map(async (value) => {
      const { data } = await axios.get(value.url);
      const name = data.name;
      const [
        { move: { name: nameone } } = one,
        { move: { name: nametwo } } = two,
        { move: { name: namethree } } = three,
      ] = data.moves;

      return { name, moves: [nameone, nametwo, namethree] };
    })
  );
  return pokemons;
}

