import "../styles/Menu.css";

function StartButton() {
  return <></>;
}

function GameDescription() {
  return <></>;
}

function Settings() {
  return <div className="settings"></div>;
}

export default function Menu() {
  return (
    <>
      <div className="menu">
        <h1 className="game-title">Meeemorrieeze</h1>
        <Settings></Settings>
        <StartButton></StartButton>
        <GameDescription></GameDescription>
      </div>
    </>
  );
}
