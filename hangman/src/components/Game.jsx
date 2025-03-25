import { useState } from "react";
import HangmanImage from "./HangmanImage.jsx";
import logic from "../data/logic.js";

export default function Game({ word, onRestart }) {
  const [status, setStatus] = useState(logic.getStatus());
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleCharOrWordSubmit = (event) => {
    event.preventDefault();
    const charOrWord = event.target.charOrWord.value.trim().toLowerCase();

    if (!charOrWord) return;

    try {
      charOrWord.length === 1
        ? logic.attemptCharacter(charOrWord)
        : logic.attemptWord(charOrWord);

      const newStatus = logic.getStatus();
      setStatus(newStatus);

      const gameIsOver = logic.isGameOver();
      setFeedback(gameIsOver ? (logic.isWon() ? "You win!" : "You lose!") : "Keep trying...");
      setGameOver(gameIsOver);
    } catch (error) {
      alert(error.message);
    }

    event.target.reset();
  };

  return (
    <div className="game">
      <HangmanImage attemptsLeft={status.remainingAttemps} />
      <p>{status.status}</p>
      <p>Remaining attempts: {status.remainingAttemps}</p>
      <form onSubmit={handleCharOrWordSubmit}>
        <input type="text" name="charOrWord" />
        {!gameOver && <button type="submit">Try</button>}
        {gameOver && <button type="button" onClick={onRestart}>Restart</button>}
      </form>
      <p>{feedback}</p>
    </div>
  );
}
