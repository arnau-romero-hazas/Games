import { useState } from "react";
import HangmanImage from "./HangmanImage.jsx";
import logic from "../data/logic.js";


export default function Game({  onRestart }) {
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
      console.log("STATUS en Game:", status)
      setStatus(newStatus);
      console.log("Nuevo STATUS en Game:", logic.getStatus());
      

      const gameIsOver = logic.isGameOver();
      setFeedback(gameIsOver ? (logic.isWon() ? "You win! 🏆" : "You lose! ") : "Keep trying...");
      setGameOver(gameIsOver);
    } catch (error) {
      alert(error.message);
    }

    event.target.reset();
  };

  return (
    <div className="game">
      {status.remainingAttempts !== undefined && (
      <HangmanImage attemptsLeft={status.remainingAttempts} />
        )}
      <h2>{status.status}</h2>
      <h1>{gameOver && feedback}</h1>
      {/* <form onSubmit={handleCharOrWordSubmit}>
        <input type="text" name="charOrWord" />
        {!gameOver && <button type="submit">Try</button>}
        {gameOver && <button type="button" onClick={onRestart}>Restart</button>}
      </form> */}
       { !gameOver && <form onSubmit={handleCharOrWordSubmit}>
        <input type="text" name="charOrWord" />
        {!gameOver && <button type="submit">Try</button>}
      </form>}
      {gameOver && <button type="button" onClick={onRestart}>Restart</button>}

    </div>
  );
}
