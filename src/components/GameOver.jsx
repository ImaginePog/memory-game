export default function GameOver({ result, updateGameState }) {
  function replay() {
    updateGameState("load");
  }

  function goToMenu() {
    updateGameState("menu");
  }

  return (
    <div>
      Over Tries: {result.tries} {result.won}
      <br />
      <button onClick={goToMenu}>Menu</button>
      <button onClick={replay}>{result.won ? "Replay" : "Retry"}</button>
    </div>
  );
}
