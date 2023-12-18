// React imports
import { useState } from "react";

// Components
import Timer from "./Timer";
import HUD from "./HUD";

// Utilities
import { difficulties } from "../utils/data";

// Style
import "../styles/Game.css";

export default function Game({ gameSettings, gameCharacters }) {
  const difficultySettings = difficulties[gameSettings.selectedDifficulty];
  return (
    <div>
      <HUD>
        <Timer
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
