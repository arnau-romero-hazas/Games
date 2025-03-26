export default function HangmanImage({ attemptsLeft }) {
console.log("ATTEMPTS LEFT en HangmanImage:", attemptsLeft);
const baseUrl = import.meta.env.VITE_BASE_URL;
return (
      <img
        alt={` ${baseUrl}Hangman stage ${6 - attemptsLeft}`}
        className="hangman-image"
      />
    );
  }
  