console.info("🚀 Your API Running right here!");
const http = require("http");
const axios = require("axios");
const fs = require("fs/promises");
const EventEmitter = require("events");
const { routes } = require("./service/routes");
const path = require("path");
const eventEmitter = new EventEmitter();

const handler = (req, res) => {
  return routes[req.url]
    ? routes[req.url](req, res)
    : routes["default"](req, res);
};

async function getPokemons() {
  const {
    data: { results },
  } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  await fs.writeFile(
    path.join(__dirname, "/database", "pokemons.json"),
    JSON.stringify(results)
  );
  eventEmitter.emit("start");
}

eventEmitter.on("start", () => {
  http.createServer(handler).listen(3000, () => {
    console.log("http://localhost:3000");
  });
});

getPokemons();
