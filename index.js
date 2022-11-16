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
select a word from the list
create an empty list of guessed letters
set up an object to track which letters are revealed:
maybe
const wordObject={
  word:'happen'
  letters:{
  'H':{indices:[0],hidden:true},
  'A':{indices:[1],hidden:true},
  'P':{indices:[2,3],hidden:true},
  'E':{indices:[4],hidden:true},
  'N':{indices:[5],hidden:true},
  }
}
to check if it contains letter
  if (wordObject.word.includes(letter))
  {
  wordObject.letters[letter].hidden=false
  }
to render 
  let lettersArray=wordObject.word.split('');
  for each item in lettersArray{
    if wordObject.letters[item].hidden{
      lettersArray[index]="-"
    }
  }
  lettersArray.join('')
  
  }

WHILE guesses < guesses allowed
  display the current guesses and status
  until a valid letter is given (WHILE)
      ask for a letter
      check to make sure it's actually a letter
      check to see if it's been guessed already
   add the letter to the list of guessed letters
  is the letter in the word (IF)?
    YES:
      reveal the letter in the word 
    NO:
      add 1 to number of guesses
*/
