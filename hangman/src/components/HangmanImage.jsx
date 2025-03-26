export default function HangmanImage({ attemptsLeft }) {
  console.log("ATTEMPTS LEFT en HangmanImage:", attemptsLeft);
  return (
      <img
        src={`/hangman-${6 - attemptsLeft}.jpg`}
        alt={`Hangman stage ${6 - attemptsLeft}`}
        className="hangman-image"
      />
    );
  }
  