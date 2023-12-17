import { getRandomInt } from "../utils/utils";

async function getPokemonById(id) {
  const pokemonResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );
  const pokemonJSON = await pokemonResponse.json();
  const { name, sprites } = { ...pokemonJSON };

  return {
    name,
    imageSrc: sprites.other["official-artwork"]["front_default"],
  };
}

async function getPokemonList(nPokemon) {
  const pokemonCountRes = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
  );
  const pokemonCountJSON = await pokemonCountRes.json();

  const usedIds = [];
  const totalPokemonNumber = pokemonCountJSON.count;

  const pokemonList = [];

  for (let i = 0; i < nPokemon; ++i) {
    let randomPokemonId = getRandomInt(1, totalPokemonNumber);
    while (usedIds.includes(randomPokemonId)) {
      randomPokemonId = getRandomInt(1, totalPokemonNumber);
    }
    usedIds.push(randomPokemonId);
    const pokemon = await getPokemonById(randomPokemonId);
    pokemonList.push(pokemon);
  }

  return pokemonList;
}
async function getRickMortyCharacters(page = 1) {
  const charactersRes = await fetch(
    `https://rickandmortyapi.com/api/character/?status=alive&page=${page}`
  );
  const charactersJSON = await charactersRes.json();
  const results = charactersJSON.results;

  // Filter names with 3+ words or 15+ letters
  const filtered = results.filter(
    (result) => result.name.split(" ").length < 3 && result.name.length < 15
  );

  return filtered;
}

export default function LoadingScreen({
  gameSettings,
  setGameCards,
  updateGameState,
}) {
  return <div className="loading-screen">LOADING.....</div>;
}
