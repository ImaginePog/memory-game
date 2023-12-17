import { useEffect } from "react";

import { difficulties } from "../utils/data";
import { getRandomInt, shuffleArray } from "../utils/utils";

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

async function getRickMortyList(nCharacters) {
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

    const newResults = await getRickMortyCharacters(++page);
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

function divideCards(nCards, categories) {
  const nCategories = categories.length;

  // divide equally
  const categoryCardMap = categories.map((category) => {
    return { category, cards: Math.floor(nCards / nCategories) };
  });

  for (
    let remainingCards = nCards % nCategories;
    remainingCards > 0;
    --remainingCards
  ) {
    const randomCategory = getRandomInt(0, categoryCardMap.length);
    categoryCardMap[randomCategory].cards++;
  }

  return categoryCardMap;
}

async function getGameCharacters(nCards, categories) {
  // const nCards = difficulties[gameSettings.selectedDifficulty].cards;
  // const nCategories = gameSettings.selectedCategories.length;

  const categoryCardMap = divideCards(nCards, categories);

  const gameCharacters = [];
  for (let i = 0; i < categoryCardMap.length; ++i) {
    const element = categoryCardMap[i];

    let newCharacters = [];

    switch (element.category) {
      case "Pokemon":
        newCharacters = await getPokemonList(element.cards);
        break;
      case "Rick and Morty":
        newCharacters = await getRickMortyList(element.cards);
        break;
      case "Dogs":
        // newCharacters = await get(element.cards);
        break;
    }

    newCharacters.forEach((char) => {
      gameCharacters.push({ ...char, category: element.category });
    });
  }

  return gameCharacters;
}

export default function LoadingScreen({
  gameSettings,
  setGameCharacters,
  updateGameState,
}) {
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getGameCharacters(
        difficulties[gameSettings.selectedDifficulty].cards,
        gameSettings.selectedCategories
      ).then((gameCharacters) => {
        setGameCharacters(gameCharacters);
        updateGameState("play");
      });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return <div className="loading-screen">LOADING.....</div>;
}
