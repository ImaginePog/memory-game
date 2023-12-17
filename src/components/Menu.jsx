import Settings from "./Settings";

import "../styles/Menu.css";

function StartButton() {
  return <></>;
}

function GameDescription() {
  return <></>;
}

export default function Menu(props) {
  return (
    <>
      <div className="menu">
        <h1 className="game-title">Meeemorrieeze</h1>
        <Settings {...props}></Settings>
        <StartButton></StartButton>
        <GameDescription></GameDescription>
      </div>
    </>
  );
}
