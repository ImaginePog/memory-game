export default function GameCard({ card, handleCardClick }) {
  return (
    <div
      className="game-card"
      key={card.key}
      data-key={card.key}
      data-id={card.id}
      onClick={handleCardClick}
    >
      <img className="game-card-img" src={card.imageSrc} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
}
