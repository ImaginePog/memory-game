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
  return (
    <p style={{ fontSize: "12px", color: "black" }}>
      Cards are shown at the start of the game try to memorize them and match
      the cards with the same characters. Try to match all the cards before the
      time runs out. Number of cards and the time to match them are based on the
      difficulty you select.{" "}
      <span style={{ color: "red" }}>
        **The dog API is kinda broken so it might not work sometimes**
      </span>
    </p>
  );
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
