// React imports
import { useEffect, useState } from "react";

// Components
import Timer from "./Timer";
import HUD from "./HUD";
import GameCard from "./GameCard";

// Utilities
import { difficulties } from "../utils/data";
import { shuffleArray } from "../utils/utils";
import { v4 as uuid } from "uuid";

// Style
import "../styles/Game.css";

export default function Game({ gameSettings, gameCharacters }) {
  const [score, setScore] = useState(0);

  const [lastSelection, setLastSelection] = useState(null);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Setup characters for cards

    const dupedAndShuffled = shuffleArray([
      ...gameCharacters,
      ...gameCharacters,
    ]);

    const cards = dupedAndShuffled.map((char) => {
      return { ...char, key: uuid() };
    });

    setCards(cards);
  }, []);

  const difficultySettings = difficulties[gameSettings.selectedDifficulty];

  function handleCardClick(e) {
    const currentSelection = {
      key: e.target.dataset.key,
      id: e.target.dataset.id,
    };

    // Empty object
    if (lastSelection === null) {
      setLastSelection(currentSelection);
      return;
    }

    // Theres a last selection
    if (
      lastSelection.key != currentSelection.key &&
      lastSelection.id == currentSelection.id
    ) {
      // Matched
      setScore(score + 1);
    }

    setLastSelection(null);
  }

  return (
    <div className="game-container">
      <HUD>
        <div className="game-score">Score: {score}</div>
        <Timer
          className="game-timer"
          initialDuration={difficultySettings.time}
          event={() => {
            //Fire game over event or something
          }}
        ></Timer>
      </HUD>
      <div className="play-area">
        <ul className="cards-container">
          {cards.map((card) => {
            return <GameCard {...{ card, handleCardClick }}></GameCard>;
          })}
        </ul>
      </div>
    </div>
  );
}
