// React imports
import { useEffect, useState } from "react";

// Components
import Timer from "./Timer";
import HUD from "./HUD";
import GameCard from "./GameCard";

// Hooks
import { useImageLoader } from "../hooks/useImageLoader";

// Utilities
import { difficulties } from "../utils/data";
import { shuffleArray, splitArrayToChunks } from "../utils/utils";
import { v4 as uuid } from "uuid";

// Style
import "../styles/Game.css";

export default function Game({ gameSettings, gameCharacters }) {
  // Game setup related
  const [cards, setCards] = useState([]);
  const imagesLoaded = useImageLoader(gameCharacters);
  const [pauseTimer, setPauseTimer] = useState(true);

  // Game logic related
  const [lastSelection, setLastSelection] = useState(null);

  useEffect(() => {
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
    if (imagesLoaded) {
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

  function calculateScore() {
    const matched = cards.filter((card) => card.matched);
    return matched.length / 2;
  }

  const difficultySettings = difficulties[gameSettings.selectedDifficulty];

  const score = calculateScore();

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

  function getGameBoard(cards) {
    const dupCards = cards.map((card) => card);

    const rows = difficultySettings.rows;
    const cols = difficultySettings.cols;

    const chunks = splitArrayToChunks(dupCards, rows);

    const bigger = rows > cols ? rows : cols;

    const divisorPercentage = 100 / bigger || 1;

    return chunks.map((chunk, i) => {
      return (
        <div
          className="game-row"
          key={uuid()}
          style={{ height: `${divisorPercentage}%` }}
        >
          {chunk.map((card) => {
            return (
              <GameCard
                key={card.key}
                {...{ card, handleCardClick, divisorPercentage }}
              ></GameCard>
            );
          })}
        </div>
      );
    });
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
        <ul className="cards-container">{getGameBoard(cards)}</ul>
      </div>
    </div>
  );
}
