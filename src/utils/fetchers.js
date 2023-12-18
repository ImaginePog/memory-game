import { getRandomInt, shuffleArray } from "./utils";

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

export async function getPokemonList(nPokemon) {
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

export async function getRickMortyList(nCharacters) {
  const pageRes = await fetch(
    "https://rickandmortyapi.com/api/character/?status=alive"
  );
  const pageJSON = await pageRes.json();
  const totalPages = pageJSON.info.pages;

  const usedPages = [];

  let randomPage = getRandomInt(1, totalPages);
  let rawResults = await getRickMortyCharacters(randomPage);
  usedPages.push(randomPage);

  while (rawResults.length < nCharacters) {
    // If current results are less than required characters
    while (usedPages.includes(randomPage)) {
      randomPage = getRandomInt(1, totalPages);
    }
    usedPages.push(randomPage);
    const newResults = await getRickMortyCharacters(randomPage);
    rawResults.push(...newResults);
  }

  rawResults = shuffleArray(rawResults);
  rawResults.length = nCharacters;

  let characterList = [];
  rawResults.forEach((result) => {
    characterList.push({ name: result.name, imageSrc: result.image });
  });

  return characterList;
}

export async function getDogsList(nDogs) {
  const dogsRes = await fetch(
    `https://dog.ceo/api/breeds/image/random/${nDogs}`
  );
  const dogsJSON = await dogsRes.json();

  const results = dogsJSON.message.map((result) => {
    // Find the breed name in the image link
    // Split the names with '-' (Api uses '-' between words for directory)
    // Change each word to uppercase
    // Join back the string for the dog's breed
    let startPos = result.indexOf("breeds/") + "breeds/".length;
    const name = result
      .substring(startPos, result.indexOf("/", startPos))
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");

    return { name, imageSrc: result };
  });

  return results;
}
