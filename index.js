import prompt from "readline-sync";
import wordBank from "./word-bank.js";
import pressAnyKey from "press-any-key";
/**
 * Formats a string to render in color in the terminal
 * @param string - the string you want to color
 * @param color - The color you want to use.
 * @returns a string with the color escape sequence added
 */
const formatString = (string, ...codes) => {
  const consoleFormat = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    reverse: "\x1b[7m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  };
  let formatCodes = "";
  for (let item of codes) {
    if (item in consoleFormat) {
      formatCodes += consoleFormat[item];
    }
  }
  return formatCodes + string + consoleFormat.reset;
};

/**
 * executes a round of the game.
 */
const runGame = () => {
  /* List of Helper functions:
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
   * @returns A string containing one letter.
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
   * It loops through the letters in the word and if the letter matches the letter that was guessed, it
   * replaces the underscore with the letter
   * @param letter - the letter that the user guessed
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
   * this function is called at the start of each turn
   */
  const renderGameData = () => {
    const livesString = "❤ ".repeat(gameData.livesRemaining);
    console.clear();
    [
      formatString("current word: ", "yellow"),
      " " + gameData.displayLetters.join(" "),

      formatString("your guesses: ", "yellow"),
      " " + gameData.guessedLetters.join(" "),

      formatString("remaining lives: ", "yellow"),
      " " + formatString(livesString, "red"),
    ].forEach((item) => {
      console.log(item);
    });
  };

  //generate the gameData object
  let gameData = generateGameData();

  // main game loop - repeats as long as there are guesses remaining and letters to be guessed.
  while (gameData.livesRemaining > 0 && gameData.displayLetters.includes("_")) {
    renderGameData(); // render the game interface
    const roundLetter = inputLetter(); //get a letter

    //check if the guess is correct or not:
    if (checkLetter(roundLetter)) {
      //correct guess - reveal the letter
      console.log("correct!");
      revealLetter(roundLetter);
    } else {
      //incorrect guess - subtract a life
      console.log("incorrect!");
      gameData.livesRemaining--;
    }
  }
  //game is over! check if the player has won or lost
  renderGameData();
  if (gameData.displayLetters.includes("_")) {
    //player has lost.
    console.log(
      `You lost, sorry. The word was ${formatString(gameData.word, "bright")}`
    );
  } else {
    console.log(
      `Congrats! you win! The word was ${formatString(
        gameData.word,
        "bright"
      )} :)`
    );
  }
};

/**
 * clears the console, prints out the welcome message, and then waits for the user to press any key
 * before starting the game
 */
const runWelcome = () => {
  console.clear();
  [
    formatString("Welcome to Hangman!", "bright"),
    formatString("===================", "bright"),
    "In this game, you will try to guess a word, one letter at a time.",
    "Each time you guess incorrectly, you lose a life.",
    "You start the game with 6 lives.",
    "You can quit the game at any point by pressing Control+C",
  ].forEach((item) => {
    console.log(item);
  });
  pressAnyKey(
    formatString("Press any key to start the game...", "bright")
  ).then(() => {
    runGame();
  });
};

runWelcome();
