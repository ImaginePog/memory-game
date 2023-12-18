// React imports
import { useState } from "react";

// Components
import Timer from "./Timer";
import HUD from "./HUD";

// Utilities
import { difficulties } from "../utils/data";
import { shuffleArray } from "../utils/utils";
import { v4 as uuid } from "uuid";

// Style
import "../styles/Game.css";

export default function Game({ gameSettings, gameCharacters }) {
  const [score, setScore] = useState(0);


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
      We gaming
    </div>
  );
}
