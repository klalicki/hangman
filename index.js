import prompt from "readline-sync";
import wordBank from "./word-bank.js";

/**
 * Select a random word from the word list.
 * @param [wordList] - an array of words to choose from.
 * @returns A random word from the given array.
 * If no wordList is provided, this will default to the imported wordbank.
 */
const selectWordFrom = (wordList = wordBank) => {
  const wordIndex = Math.floor(Math.random() * wordList.length);
  return wordList[wordIndex];
};

console.log(selectWordFrom());
