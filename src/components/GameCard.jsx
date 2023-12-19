function CardImage({ url, alt }) {
  return <img className="game-card-img" src={url} alt={alt}></img>;
}

export default function GameCard({ card, handleCardClick }) {
  let classes = "game-card";
  if (card.matched) {
    classes += " " + "matched-card";
  } else if (!card.shown) {
    classes += " " + "hide-card";
  }

  return (
    <div
      className={classes}
      data-key={card.key}
      data-id={card.id}
      data-shown={card.shown}
      data-matched={card.matched}
      onClick={handleCardClick}
    >
      <CardImage url={card.imageSrc} alt={card.name}></CardImage>
      <p>{card.name}</p>
    </div>
  );
}
