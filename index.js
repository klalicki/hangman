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

/**
 * prompts the user to input a letter, and if the input is not a letter, prompts the user to
 * input a letter again. Returns the lowercase of that letter
 * @returns A function that takes no arguments and returns a string.
 */
const inputLetter = () => {
  let isValidInput = false;
  let input;
  while (!isValidInput) {
    input = prompt.question("Please enter a letter: ", {});
    //validate input
    // test to make sure the input only contains letters
    if (!/[A-Za-z]/.test(input)) {
      console.log("Invalid input: please input a letter");
      //test to make sure only one
    } else if (input.length != 1) {
      console.log("Invalid input: please input a letter");
    } else {
      return input.toLowerCase();
    }
  }
  return input.toLowerCase();
};

/**
 * Checks to see if a letter is part of the word, returns a boolean.
 * @param letter - The letter that the user typed.
 * @returns A boolean value.
 */
const checkLetter = (letter) => {
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
 * Generates an object containing all the data for the current round.
 * @returns An object
 */
const generateGameData = () => {
  const guessesRemaining = 6;
  const word = selectWord();
  const wordLength = word.length;
  const letters = word.split("");
  const displayLetters = letters.map(() => {
    return "_";
  });
  return { word, wordLength, letters, displayLetters, guessesRemaining };
};
const renderGameData = () => {
  console.log(`remaining guesses: ${gameData.guessesRemaining}`);
  console.log(`word so far: ${gameData.displayLetters}`);
};
/* 
select a word from the list   
reset the number of guesses remaining   
create an array containing the letters of the word  
create an array of the rendered letters [_,_,_,...] 
create an empty array of guessed letters (to be able to check if a letter has been guessed already)

WHILE guesses remaining > 0 
  display the current guesses and status (render function)
  until a valid letter is given (WHILE)
      ask for a letter
      check to make sure it's actually a letter
      check to see if it's been guessed already
   add the letter to the list of guessed letters
  is the letter in the word (IF)?
    YES:
      reveal the letter in the word 
    NO:
      subtract 1 from remaining guesses



    
*/
let gameData;
/**
 * executes a round of the game.
 */
const runGame = () => {
  //generate the gameData object
  gameData = generateGameData();
  console.log(gameData.word);

  // main game loop - repeats as long as there are guesses remaining and letters to be guessed.
  while (
    gameData.guessesRemaining > 0 &&
    gameData.displayLetters.includes("_")
  ) {
    renderGameData();
    const roundLetter = inputLetter();
    if (checkLetter(roundLetter)) {
      console.log("correct!");
      revealLetter(roundLetter);
    } else {
      console.log("incorrect!");
      gameData.guessesRemaining--;
    }
  }
  //game is over! check if the player has won or lost
  if (gameData.displayLetters.includes("_")) {
    //player has lost.
    console.log("you lost, srry.");
  } else {
    console.log("congrats! you win :)");
  }
};

runGame();
