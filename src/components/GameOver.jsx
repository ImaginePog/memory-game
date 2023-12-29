export default function GameOver({ result, updateGameState }) {
  function replay() {
    updateGameState("load");
  }

  function goToMenu() {
    updateGameState("menu");
  }

  function showInfo() {
    if (result.won) {
      return (
        <>
          <p>Well done! you matched all the cards</p>
          <p>Tries taken: {result.tries}</p>
          <p>Won in {result.timeTaken} seconds</p>
        </>
      );
    } else {
      return <p>You lost time is over!</p>;
    }
  }

  return (
    <div>
      <p>Game Over</p>
      {showInfo()}
      <p>
        Score: {result.score}/{result.maxScore}
      </p>
      <button onClick={goToMenu}>Menu</button>
      <button onClick={replay}>{result.won ? "Replay" : "Retry"}</button>
    </div>
  );
}
