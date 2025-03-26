import { useState, useEffect } from "react";
import logic from "./data/logic";
import Intro from "./components/Intro";
import Game from "./components/Game";

function App() {
  const [view, setView] = useState("intro");
  const [status, setStatus] = useState(logic.getStatus());

  useEffect(() => {
    setStatus(logic.getStatus());
  }, [view]);

  const startGame = (word) => {
    logic.introduceWord(word);
    setStatus(logic.getStatus());
    setView("game");
  };

  const restartGame = () => {
    logic.resetGame();
    setStatus(logic.getStatus());
    setView("intro");
  };

  return <>{view === "intro" ? <Intro onStart={startGame} /> : <Game status={status} attemptsLeft={status.remainingAttemps} onRestart={restartGame} />}</>;
}

export default App;
