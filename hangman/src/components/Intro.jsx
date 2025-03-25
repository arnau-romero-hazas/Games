import { useState } from "react";

export default function Intro({ onStart }) {
  const [word, setWord] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (word.trim()) onStart(word);
  };

  return (
    <div className="intro">
      <h1>Hangman Game</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="word">Guess word? </label>
        <input
          type="text"
          name="word"
          id="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}