function CardImage({ url, alt, onLoad }) {
  return (
    <img className="game-card-img" src={url} alt={alt} onLoad={onLoad}></img>
  );
}

export default function GameCard({ card, handleCardClick, show, onImageLoad }) {
  return (
    <div
      className={`game-card ${!show ? "hide-card" : ""}`}
      data-key={card.key}
      data-id={card.id}
      onClick={handleCardClick}
    >
      <CardImage
        url={card.imageSrc}
        alt={card.name}
        onLoad={onImageLoad}
      ></CardImage>
      <p>{card.name}</p>
    </div>
  );
}
