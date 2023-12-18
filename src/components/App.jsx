// React imports
import { useState } from "react";

// Components
import Menu from "./Menu";
import LoadingScreen from "./LoadingScreen";
import Game from "./Game";

// Other imports
import { defaultSettings } from "../utils/data";

export default function App() {
  const [gameState, setGameState] = useState("menu");
  const [gameSettings, setGameSettings] = useState(defaultSettings);
  const [gameCharacters, setGameCharacters] = useState({});

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
        return (
          <LoadingScreen
            {...{ gameSettings, setGameCharacters, updateGameState }}
          ></LoadingScreen>
        );
      case "play":
        return <Game {...{ gameSettings, gameCharacters }}></Game>;
    }
  }

  return <>{getDisplayComponent()}</>;
}
