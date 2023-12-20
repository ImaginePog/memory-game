// Components
import Settings from "./Settings";

// Styles
import "../styles/Menu.css";

function StartButton({ startGame, gameSettings }) {
  return (
    <>
      <button
        className="start-btn"
        onClick={() => {
          if (gameSettings.selectedCategories.length == 0) {
            alert("Select atleast 1 category of cards!!");
            return;
          }

          // Passed
          startGame();
        }}
      >
        Start
      </button>
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
        <StartButton {...{ ...props, startGame }}></StartButton>
        <GameDescription></GameDescription>
      </div>
    </>
  );
}
