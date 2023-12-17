async function getPokemonById(id) {
  const pokemonResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );
  const pokemonJSON = await pokemonResponse.json();
  const { name, sprites } = { ...pokemonJSON };

  return {
    name,
    imageSrc: sprites.other["official-artwork"]["front_default"],
  };
}

export default function LoadingScreen({
  gameSettings,
  setGameCards,
  updateGameState,
}) {
  return <div className="loading-screen">LOADING.....</div>;
}
