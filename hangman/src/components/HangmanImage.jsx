export default function HangmanImage({ attemptsLeft }) {
    return (
      <img
        src={`/../../public/hangman-${6 - attemptsLeft}.jpg`}
        alt={`Hangman stage ${6 - attemptsLeft}`}
        className="hangman-image"
      />
    );
  }
  