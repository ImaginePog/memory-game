import { useState } from "react";
import Menu from "./Menu";

import { defaultSettings } from "../utils/data";

export default function App() {
  const [gameState, setGameState] = useState("menu");
  const [gameSettings, setGameSettings] = useState(defaultSettings);

  function updateGameSettings(updateSetting, updatedValue) {
    setGameSettings({ ...gameSettings, [updateSetting]: updatedValue });
  }

  function updateGameState(newState) {
    setGameSettings(newState);
  }

  return (
    <>
      <Menu {...{ gameSettings, updateGameSettings, updateGameState }}></Menu>
    </>
  );
}
