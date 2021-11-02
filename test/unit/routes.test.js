const { routes } = require("../../src/service/routes");
const PokemonRepository = require("../../src/repository/pokemonRepository");
const { describe, expect, test } = require("@jest/globals");


const mocks = {
  threePokemons: require("../mocks/MockThreePokemons.json"),
  OnePokemon: require("../mocks/MockOnePokemon.json"),
};

//using spies
describe("testing the routes object using spies", () => {
  const httpParams = {
    req: {
      headers: {
        "Content-Type": "application/json",
      },
      method: "",
      body: {},
    },
    res: {
      //mocks attr
      end: jest.fn(),
      writeHead: jest.fn(),
      setHeader: jest.fn(),
    },
    values: () => Object.values(httpParams),
  };

  test('testing the route "/team"', async () => {
    const params = {
      ...httpParams,
    };

    jest
      .spyOn(PokemonRepository, PokemonRepository.readThreePokemons.name)
      .mockResolvedValue(mocks.threePokemons);

    params.req.method = "GET";
    await routes[params.req.method]["/team"](...params.values());
    expect(params.res.end).toHaveBeenNthCalledWith(
      1,
      JSON.stringify([
        { "name": "bulbasaur", "moves": ["razor-wind", "swords-dance", "cut"] },
        { "name": "ivysaur", "moves": ["swords-dance", "cut", "bind"] },
        { "name": "venusaur", "moves": ["swords-dance", "cut", "bind"] }
      ]));
  });

  test('testing the route "/" or route default', async () => {
    const params = {
      ...httpParams,
    };

    jest
      .spyOn(PokemonRepository, PokemonRepository.readOnePokemon.name)
      .mockResolvedValue(mocks.OnePokemon);

    params.req.method = "GET";
    await routes[params.req.method]["/"](...params.values());

    expect(params.res.end).toHaveBeenNthCalledWith(
      1,
      JSON.stringify([
        { "name": "bulbasaur", "moves": ["razor-wind", "swords-dance", "cut"] }
      ])
    );
  });
});


