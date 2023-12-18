// Components
import Settings from "./Settings";

// Styles
import "../styles/Menu.css";

function StartButton({ startGame }) {
  return (
    <>
      <button onClick={startGame}>Start</button>
    </>
  );
}

function GameDescription() {
  return <></>;
}

export default function Menu(props) {
  function startGame() {
    props.updateGameState("load");
  }

  return (
    <>
      <div className="menu">
        <h1 className="game-title">Meeemorrieeze</h1>
        <Settings {...props}></Settings>
        <StartButton startGame={startGame}></StartButton>
        <GameDescription></GameDescription>
      </div>
    </>
  );
}
