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
  const [showCards, setShowCards] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [pauseTimer, setPauseTimer] = useState(true);

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
    setShowCards(cards.map((card) => card.key));
  }, []);

  useEffect(() => {
    if (imagesLoaded <= 0) {
      return;
    }

    if (imagesLoaded == cards.length) {
      setTimeout(() => {
        setShowCards([]);
        setPauseTimer(false);
      }, 5000);
    }
  }, [imagesLoaded]);

  function onImageLoad() {
    setImagesLoaded((imagesLoaded) => imagesLoaded + 1);
  }

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
      setCards(cards.filter((card) => card.id != currentSelection.id));
    }

    // If there was a last selection it means the selections have to be cleared after current selection
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
          pause={pauseTimer}
        ></Timer>
      </HUD>
      <div className="play-area">
        <ul className="cards-container">
          {cards.map((card) => {
            const show = showCards.includes(card.key);
            return (
              <GameCard
                key={card.key}
                {...{ card, handleCardClick, show, onImageLoad }}
              ></GameCard>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
