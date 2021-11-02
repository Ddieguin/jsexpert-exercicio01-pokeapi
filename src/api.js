const http = require("http");
const axios = require("axios");
const fs = require("fs/promises");
const EventEmitter = require("events");
const { routes } = require("./service/routes");
const path = require("path");
const eventEmitter = new EventEmitter();

const handler = (req, res) => {
  return routes[req.method]
    ? routes[req.method][routes[req.method][req.url] ? req.url : "default"](req, res)
    : routes["undefined"](req, res);
};

(async () => {
  const {
    data: { results: pokemons },
  } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);

  const arrayOfPokemons = await fillPokemons(pokemons);
  await readFile(arrayOfPokemons);
  eventEmitter.emit("start");
})();

async function readFile(content) {
  await fs.writeFile(
    path.join(__dirname, "/database", "pokemons.json"),
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

const server = http.createServer(handler);

module.exports = { server };
