// React imports
import { useEffect } from "react";

// Other imports
import { difficulties } from "../utils/data";
import { getRandomInt } from "../utils/utils";

import {
  getPokemonList,
  getRickMortyList,
  getDogsList,
} from "../utils/fetchers";

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
    const randomCategory = getRandomInt(0, categoryCardMap.length - 1);
    categoryCardMap[randomCategory].cards++;
  }

  return categoryCardMap;
}

async function getGameCharacters(nCards, categories) {
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
        newCharacters = await getDogsList(element.cards);
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

    getGameCharacters(
      difficulties[gameSettings.selectedDifficulty].cards,
      gameSettings.selectedCategories
    ).then((gameCharacters) => {
      if (!ignore) {
        setGameCharacters(gameCharacters);
        updateGameState("play");
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return <div className="loading-screen">LOADING.....</div>;
}
