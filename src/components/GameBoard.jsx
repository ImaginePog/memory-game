// Components
import GameCard from "./GameCard";

// Utils
import { splitArrayToChunks } from "../utils/utils";
import { v4 as uuid } from "uuid";

export default function GameBoard({ cards, dimensions, handleCardClick }) {
  function getGameBoard(cards, dimensions, handleCardClick) {
    const dupCards = cards.map((card) => card);

    const rows = dimensions.rows;
    const cols = dimensions.cols;
    const bigger = rows > cols ? rows : cols;
    const divisorPercentage = 100 / bigger || 1;

    const chunks = splitArrayToChunks(dupCards, rows);
    return chunks.map((chunk) => {
      return (
        <div
          className="game-row"
          key={uuid()}
          style={{ height: `${divisorPercentage}%` }}
        >
          {chunk.map((card) => {
            return (
              <GameCard
                key={card.key}
                {...{ card, handleCardClick, divisorPercentage }}
              ></GameCard>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className="game-board">
      {getGameBoard(cards, dimensions, handleCardClick)}
    </div>
  );
}
