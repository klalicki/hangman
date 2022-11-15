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

/* 
choose a word from the list
create an empty list of guessed letters
while the number of guesses < max number of guesses allowed{
--display the current guesses and status
--until a valid letter is given{
-- -- ask for a letter
-- -- check to make sure it's actually a letter
-- -- check to see if it's been guessed already
--}
-- add the letter to the list of guessed letters
--is the letter in the word?
--yes:
-- -- reveal the letter in the word
-- -- 
--no:
----add 1 to number of guesses
}
*/
