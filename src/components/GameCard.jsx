// Styles
import "../styles/GameCard.css";

function CardImage({ url, alt }) {
  return <img className="game-card-img" src={url} alt={alt}></img>;
}

export default function GameCard({ card, processClick, divisorPercentage }) {
  let classes = "game-card";
  if (card.matched) {
    classes += " " + "matched-card";
  } else if (card.shown) {
    classes += " " + "flip";
  }

  function handleClick(e) {
    const currentSelection = {
      key: e.target.dataset.key,
      id: e.target.dataset.id,
      matched: JSON.parse(e.target.dataset.matched),
      shown: JSON.parse(e.target.dataset.shown),
    };
    processClick(currentSelection);
  }

  return (
    <div
      key={card.key}
      className={classes}
      style={{ width: `${divisorPercentage}%` }}
      onClick={handleClick}
      data-key={card.key}
      data-id={card.id}
      data-shown={card.shown}
      data-matched={card.matched}
    >
      <div className="game-card-inner">
        <div className="game-card-front">{card.category}</div>
        <div className="game-card-back">
          <CardImage url={card.imageSrc} alt={card.name}></CardImage>
          <p className="game-card-name">{card.name}</p>
        </div>
      </div>
    </div>
  );
}
