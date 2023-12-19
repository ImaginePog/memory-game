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
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [pauseTimer, setPauseTimer] = useState(true);

  useEffect(() => {
    // Setup characters for cards

    const dupedAndShuffled = shuffleArray([
      ...gameCharacters,
      ...gameCharacters,
    ]);

    const cards = dupedAndShuffled.map((char) => {
      return { ...char, key: uuid(), shown: true, matched: false };
    });

    setCards(cards);
  }, []);

  useEffect(() => {
    if (imagesLoaded <= 0) {
      return;
    }

    if (imagesLoaded == cards.length) {
      setTimeout(() => {
        setCards(
          cards.map((card) => {
            return { ...card, shown: false };
          })
        );
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
      matched: JSON.parse(e.target.dataset.matched),
      shown: JSON.parse(e.target.dataset.shown),
    };

    const shownCardsCount = cards.filter((card) => card.shown).length;
    // Ignore the click if:
    // 1) The card is being shown
    // 2) The card is matched
    // 3) Two cards are already being shown
    if (
      currentSelection.shown ||
      currentSelection.matched ||
      shownCardsCount > 1
    ) {
      return;
    }

    setCards(
      cards.map((card) => {
        if (card.key == currentSelection.key) {
          return { ...card, shown: true };
        } else {
          return card;
        }
      })
    );

    // If this was the first click
    if (lastSelection == null) {
      setLastSelection(currentSelection);
      return;
    }

    // There was a previous selection
    // Check if its a match
    if (
      lastSelection.key != currentSelection.key &&
      lastSelection.id == currentSelection.id
    ) {
      // The cards' keys are diff but their ids are same hence a match
      setScore(score + 1);
      setCards(
        cards.map((card) => {
          if (card.id == currentSelection.id) {
            // Matched cards
            return { ...card, shown: false, matched: true };
          } else {
            return card;
          }
        })
      );
      setLastSelection(null);
    } else {
      // NO match hide the shown cards
      setTimeout(() => {
        setCards(
          cards.map((card) => {
            return { ...card, shown: false };
          })
        );
        setLastSelection(null);
      }, 3000);
    }
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
            return (
              <GameCard
                key={card.key}
                {...{ card, handleCardClick, onImageLoad }}
              ></GameCard>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
