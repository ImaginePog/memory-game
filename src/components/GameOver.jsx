export default function GameOver({ result }) {
  return (
    <div>
      Over {result.tries} {result.won}
    </div>
  );
}
