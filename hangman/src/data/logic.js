// 📂 src/data/logic.js
import { getData, saveData, resetData } from "./data";

const logic = {
  constants: {
    ALPHABET: "aàábcçdeèéfghiíïjklmnñoòópqrstuúüvwxyz",
    MAX_ATTEMPTS: 6
  },

  helper: {
    checkWordMatchesAlphabet(word) {
      return [...word].every(char => logic.helper.checkCharacterMatchesAlphabet(char));
    },

    checkCharacterMatchesAlphabet(character) {
      return logic.constants.ALPHABET.includes(character);
    },

    hasRemainingAttempts() {
      return getData().remainingAttempts > 0;
    },

    hasGuessedWord() {
      return getData().progress.every(status => status);
    }
  },

  introduceWord(candidateWord) {
    if (typeof candidateWord !== "string" || candidateWord.length === 0)
      throw new Error("Invalid word");

    if (!logic.helper.checkWordMatchesAlphabet(candidateWord))
      throw new Error("Word contains invalid characters");

    const newData = {
      word: candidateWord.toLowerCase(),
      progress: Array(candidateWord.length).fill(false),
      remainingAttempts: logic.constants.MAX_ATTEMPTS
    };

    saveData(newData);
  },

  getStatus() {
    const data = getData();
    console.log("getStatus() DATA:", data);
    return {
      status: data.word.split("").map((char, i) => (data.progress[i] ? char.toUpperCase() : "  -  ")).join(""),
      remainingAttempts: data.remainingAttempts
    };
  },

  attemptCharacter(attemptedCharacter) {
    if (!logic.helper.hasRemainingAttempts()) throw new Error("No more attempts");
    if (logic.helper.hasGuessedWord()) throw new Error("Word already guessed");
    if (attemptedCharacter.length !== 1) throw new Error("Invalid character");

    let data = getData();
    attemptedCharacter = attemptedCharacter.toLowerCase();

    if (!logic.helper.checkCharacterMatchesAlphabet(attemptedCharacter))
      throw new Error("Invalid character (not in alphabet)");

    let found = false;
    for (let i = 0; i < data.word.length; i++) {
      if (data.word[i] === attemptedCharacter) {
        data.progress[i] = true;
        found = true;
      }
    }

    if (!found) data.remainingAttempts--;

    saveData(data);
  },

  attemptWord(attemptedWord) {
    if (!logic.helper.hasRemainingAttempts()) throw new Error("No more attempts");
    if (logic.helper.hasGuessedWord()) throw new Error("Word already guessed");

    let data = getData();
    attemptedWord = attemptedWord.toLowerCase();

    if (attemptedWord === data.word) {
      data.progress.fill(true);
    } else {
      data.remainingAttempts = 0;
    }

    saveData(data);
  },

  resetGame() {
    resetData();
  },

  isGameOver() {
    return !logic.helper.hasRemainingAttempts() || logic.helper.hasGuessedWord();
  },

  isWon() {
    return logic.helper.hasGuessedWord();
  }
};

export default logic;
