import prompt from "readline-sync";
import wordBank from "./word-bank.js";

/**
 * executes a round of the game.
 */
const runGame = () => {
  /* Helper functions:
selectWord()
generateGameData()
inputLetter()
checkLetter()
revealLetter()
renderGameData()
; */

  /**
   * Select a random word from the wordBank array and return it.
   * @returns A random word from the wordBank array.
   */
  const selectWord = () => {
    const wordIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[wordIndex];
  };

  /**
   * Generates an object containing all the data for the current round.
   * @returns An object
   */
  const generateGameData = () => {
    const livesRemaining = 6;
    const word = selectWord();
    const wordLength = word.length;
    const letters = word.split("");
    const guessedLetters = [];
    const displayLetters = letters.map(() => {
      return "_";
    });
    return {
      word,
      wordLength,
      letters,
      displayLetters,
      livesRemaining,
      guessedLetters,
    };
  };

  /**
   * prompts the user to input a letter, and if the input is not a letter, prompts the user to
   * input a letter again. Returns the lowercase of that letter
   * @returns A function that takes no arguments and returns a string.
   */
  const inputLetter = () => {
    let isValidInput = false;
    let input;
    while (!isValidInput) {
      input = prompt.question("Please enter a letter: ", {}).toLowerCase();
      //validate input
      // test to make sure the input only contains letters
      if (!/[A-Za-z]/.test(input)) {
        console.log("Invalid input: please input a letter");
        //test to make sure only one letter
      } else if (input.length != 1) {
        console.log("Invalid input: please input a letter");
        //test to see if the letter has been guessed already
      } else if (gameData.guessedLetters.includes(input)) {
        console.log(
          `You have already guessed ${input}. Try a different letter.`
        );
      } else {
        return input;
      }
    }
    return input.toLowerCase();
  };

  /**
   * Checks to see if a letter is part of the word, returns a boolean. Add the letter to the list of guesses, sort that list.
   * @param letter - The letter that the user typed.
   * @returns A boolean value.
   */
  const checkLetter = (letter) => {
    //add letter to the guesses list
    gameData.guessedLetters.push(letter);
    gameData.guessedLetters.sort();
    return gameData.letters.includes(letter);
  };

  /**
   * Loops through the word and reveals the letter that was passed to it.
   * This function edits the gameData object, and does not return anything.
   * @param letter - the letter that was guessed
   */
  const revealLetter = (letter) => {
    gameData.letters.forEach((wordLetter, index) => {
      if (wordLetter === letter) {
        gameData.displayLetters[index] = wordLetter;
      }
    });
  };

  /**
   * this function renders the game interface, such as the number of lives remaining, list of letters guessed, etc
   */
  const renderGameData = () => {
    console.clear();
    console.log(
      `remaining lives: ${"❤ ".repeat(gameData.livesRemaining)}${"- ".repeat(
        6 - gameData.livesRemaining
      )}`
    );
    console.log(`word so far: ${gameData.displayLetters.join(" ")}`);
    console.log(`letters guessed so far: ${gameData.guessedLetters}`);
  };

  //generate the gameData object
  let gameData = generateGameData();
  console.log(gameData.word);

  // main game loop - repeats as long as there are guesses remaining and letters to be guessed.
  while (gameData.livesRemaining > 0 && gameData.displayLetters.includes("_")) {
    renderGameData();
    const roundLetter = inputLetter();

    if (checkLetter(roundLetter)) {
      console.log("correct!");
      revealLetter(roundLetter);
    } else {
      console.log("incorrect!");
      gameData.livesRemaining--;
    }
  }
  //game is over! check if the player has won or lost
  if (gameData.displayLetters.includes("_")) {
    //player has lost.
    console.log(`you lost, sorry. the word was ${gameData.word}`);
  } else {
    console.log("congrats! you win! :)");
  }
};

// let gameData;
runGame();
