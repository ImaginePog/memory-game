// Components
import GameCard from "./GameCard";

// Utils
import { splitArrayToChunks } from "../utils/utils";

export default function GameBoard({ cards, dimensions, processClick }) {
  function getGameBoard(cards, dimensions, processClick) {
    const dupCards = cards.map((card) => card);

    const rows = dimensions.rows;
    const cols = dimensions.cols;
    const bigger = rows > cols ? rows : cols;
    const divisorPercentage = 100 / bigger || 1;

    const chunks = splitArrayToChunks(dupCards, rows);
    return chunks.map((chunk, i) => {
      return (
        <div
          className="game-row"
          key={i}
          style={{ height: `${divisorPercentage * 1.5}%` }}
        >
          {chunk.map((card) => {
            return (
              <GameCard
                key={card.key}
                {...{ card, processClick, divisorPercentage }}
              ></GameCard>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className="game-board">
      {getGameBoard(cards, dimensions, processClick)}
    </div>
  );
}
