import prompt from "readline-sync";
import wordBank from "./word-bank.js";

/**
 * Select a random word from the wordBank array and return it.
 * @returns A random word from the wordBank array.
 */
const selectWord = () => {
  const wordIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[wordIndex];
};

/* the WordGame class contains all of the logic needed to play a single round of hangman */
class WordGame {
  constructor(word, numberOfLives = 6) {
    //number of lives remaining before the game is over
    this.livesRemaining = numberOfLives;
    //string containing the word being used for the game
    this.word = word;
    //length of the word - used for looping over it
    this.wordLength = word.length;
    //an array containing the word, split into letters
    this.letters = word.split("");
    //an array containing all of the letters that have been guessed so far
    this.guessedLetters = [];
    //an array, that corresponds to this.letters, that tracks which letters have been correctly guessed in the word
    this.displayLetters = this.letters.map(() => {
      return "_";
    });
  }
  /*
   * this function renders the game interface, such as the number of lives remaining, list of letters guessed, etc
   */
  render() {
    console.clear();
    console.log(
      `remaining lives: ${"❤ ".repeat(this.livesRemaining)}${"- ".repeat(
        6 - this.livesRemaining
      )}`
    );
    console.log(`word so far: ${this.displayLetters.join(" ")}`);
    console.log(`letters guessed so far: ${this.guessedLetters}`);
  }

  /**
   * prompts the user to input a letter, and if the input is not a letter, prompts the user to
   * input a letter again. Returns the lowercase of that letter
   * @returns A function that takes no arguments and returns a string.
   */
  inputLetter = () => {
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
      } else if (this.guessedLetters.includes(input)) {
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
   * Loops through the word and reveals the letter that was passed to it.
   * This function edits the gameData object, and does not return anything.
   * @param letter - the letter that was guessed
   */
  revealLetter = (letter) => {
    this.letters.forEach((wordLetter, index) => {
      if (wordLetter === letter) {
        this.displayLetters[index] = wordLetter;
      }
    });
  };

  /**
   * Checks to see if a letter is part of the word, returns a boolean. Add the letter to the list of guesses, sort that list.
   * @param letter - The letter that the user typed.
   * @returns A boolean value.
   */
  checkLetter = (letter) => {
    //add letter to the guesses list
    this.guessedLetters.push(letter);
    this.guessedLetters.sort();
    return this.letters.includes(letter);
  };

  /**
   * Plays one round of the game.
   *  */
  play = () => {
    // main game loop - repeats as long as there are guesses remaining and letters to be guessed.
    while (this.livesRemaining > 0 && this.displayLetters.includes("_")) {
      this.render();
      const roundLetter = this.inputLetter();

      if (this.checkLetter(roundLetter)) {
        console.log("correct!");
        this.revealLetter(roundLetter);
      } else {
        console.log("incorrect!");
        this.livesRemaining--;
      }
    }
    //game is over! check if the player has won or lost
    if (this.displayLetters.includes("_")) {
      //player has lost.
      console.log(`you lost, sorry. the word was ${this.word}`);
    } else {
      this.render();
      console.log("congrats! you win! :)");
    }
  };
}

//
console.log("Welcome to Hangman");
prompt.keyIn("Press any key to begin.", {
  hideEchoBack: true,
  mask: "",
});

const word = selectWord();
const game = new WordGame(word);
game.play();
