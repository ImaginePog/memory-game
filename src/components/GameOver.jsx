export default function GameOver({ result, updateGameState }) {
  function replay() {
    updateGameState("load");
  }

  return (
    <div>
      Over Tries: {result.tries} {result.won}
      <br />
      <button onClick={replay}>{result.won ? "Replay" : "Retry"}</button>
    </div>
  );
}
