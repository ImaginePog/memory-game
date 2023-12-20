// React imports
import { useState, useEffect } from "react";

// Components
import Menu from "./Menu";
import Game from "./Game";
import Loader from "./Loader";

// Other imports
import { defaultSettings } from "../utils/data";
import { difficulties } from "../utils/data";
import { getRandomInt } from "../utils/utils";
import { v4 as uuid } from "uuid";

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
      gameCharacters.push({
        ...char,
        category: element.category,
        id: uuid(),
      });
    });
  }

  return gameCharacters;
}

export default function App() {
  const [gameState, setGameState] = useState("menu");
  const [gameSettings, setGameSettings] = useState(defaultSettings);
  const [gameCharacters, setGameCharacters] = useState({});

  useEffect(() => {
    let ignore = false;

    if (gameState == "load") {
      getGameCharacters(
        difficulties[gameSettings.selectedDifficulty].cards,
        gameSettings.selectedCategories
      ).then((gameCharacters) => {
        if (!ignore) {
          setGameCharacters(gameCharacters);
          updateGameState("play");
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [gameState]);

  function updateGameSettings(updateSetting, updatedValue) {
    setGameSettings({ ...gameSettings, [updateSetting]: updatedValue });
  }

  function updateGameState(newState) {
    setGameState(newState);
  }

  function getDisplayComponent() {
    switch (gameState) {
      case "menu":
        return (
          <Menu
            {...{ gameSettings, updateGameSettings, updateGameState }}
          ></Menu>
        );
      case "load":
        return <Loader>Loading images or somehting</Loader>;
      case "play":
        return <Game {...{ gameSettings, gameCharacters }}></Game>;
    }
  }

  return <>{getDisplayComponent()}</>;
}
