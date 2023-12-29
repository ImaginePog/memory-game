// React imports
import { useEffect, useState } from "react";

// Components
import HUD from "./HUD";
import GameBoard from "./GameBoard";
import Loader from "./Loader";

// Hooks
import { useImageLoader } from "../hooks/useImageLoader";

// Utilities
import { difficulties } from "../utils/data";
import { shuffleArray } from "../utils/utils";
import { v4 as uuid } from "uuid";

// Style
import "../styles/Game.css";

function Pause({ updateGameState, unpause }) {
  return (
    <div className="pause-overlay" onClick={unpause}>
      <div
        className="pause-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>Paused</p>
        <br />
        <button
          onClick={() => {
            updateGameState("menu");
          }}
        >
          Menu
        </button>
        <button onClick={unpause}>Resume</button>
      </div>
    </div>
  );
}

export default function Game({
  gameSettings,
  gameCharacters,
  setResult,
  updateGameState,
}) {
  // Game setup related
  const [cards, setCards] = useState([]);
  const imagesLoaded = useImageLoader(gameCharacters);
  const [pauseTimer, setPauseTimer] = useState(true);
  const [tries, setTries] = useState(0);
  const difficultySettings = difficulties[gameSettings.selectedDifficulty];
  const [timeRemaining, setTimeRemaining] = useState(difficultySettings.time);

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
    let interval;
    if (timeRemaining > 0 && !pauseTimer) {
      interval = setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
    }

    return () => clearInterval(interval);
  }, [pauseTimer, timeRemaining]);

  // TODO make timers a settings variable imported from data.js
  useEffect(() => {
    if (imagesLoaded) {
      setTimeout(() => {
        setCards(
          cards.map((card) => {
            return { ...card, shown: false };
          })
        );
        setPauseTimer(false);
      }, 2000);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (calculateScore() == cards.length / 2 && cards.length != 0) {
      // Got all da score therefore game won
      finishGame(true);
    }
  }, [tries]);

  function calculateScore() {
    const matched = cards.filter((card) => card.matched);
    return matched.length / 2;
  }

  function processClick(currentSelection) {
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
      }, 1000);
    }
    setTries(tries + 1);
  }

  function finishGame(won) {
    // Collect result
    const result = {};
    result.tries = tries;

    // TODO Collect time taken

    result.won = won;

    // Set game result
    setResult(result);

    // Set game state to over
    updateGameState("over");
  }

  function pause() {
    // Dont allow pausing if the timers not started yet
    if (timeRemaining != difficultySettings.time) setPauseTimer(true);
  }

  function unpause() {
    setPauseTimer(false);
  }

  const score = calculateScore();

  return (
    <div className="game-container">
      <>
        {pauseTimer && timeRemaining != difficultySettings.time ? (
          <Pause {...{ unpause, updateGameState }}></Pause>
        ) : (
          ""
        )}
        <>
          <HUD>
            <div className="game-score">Score: {score}</div>
            <button onClick={pause}>Pause</button>
            <div>{timeRemaining}</div>
          </HUD>
          <div className="play-area">
            {imagesLoaded ? (
              <GameBoard
                {...{
                  cards,
                  dimensions: {
                    rows: difficultySettings.rows,
                    cols: difficultySettings.cols,
                  },
                  processClick,
                }}
              ></GameBoard>
            ) : (
              <Loader>Loading images</Loader>
            )}
          </div>
        </>
      </>
    </div>
  );
}
