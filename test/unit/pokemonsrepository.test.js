const PokemonRepository = require("../../src/repository/pokemonRepository");
const { describe, expect, test } = require("@jest/globals");
const sinon = require("sinon");

describe("testing PokemonRepository class", () => {
  afterEach(() => {
    sinon.restore();
  });

  test("ReadthreePokemonsMethod", async () => {
    const stub = sinon.stub(Math);

    stub.floor
      .onFirstCall()
      .returns(0)
      .onSecondCall()
      .returns(1)
      .onThirdCall()
      .returns(2);

    const expected = [
      { name: "bulbasaur", moves: ["razor-wind", "swords-dance", "cut"] },
      { name: "ivysaur", moves: ["swords-dance", "cut", "bind"] },
      { name: "venusaur", moves: ["swords-dance", "cut", "bind"] },
    ];

    const results = await PokemonRepository.readThreePokemons();

    expect(expected).toEqual(results);
  });

  test("ReadOnePokemonMethod", async () => {
    const stub = sinon.stub(Math);

    stub.floor.onFirstCall().returns(0);

    const expected = [
      { "name": "bulbasaur", "moves": ["razor-wind", "swords-dance", "cut"] }
    ];
  
    const result = await PokemonRepository.readOnePokemon();

    expect(expected).toEqual(result);
  });
});
