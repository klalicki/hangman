# hangman

First project for my JavaScript Fundamentals class - a terminal-based word game. This game follows the rules of Hangman: a random word is selected, and the user tries to guess all the letters of the word. The user is allowed 6 incorrect guesses before the game ends.

## Requirements

This project was designed to run in Node.js v16, and has the following dependencies (included in package.json)

- [readline-sync](https://www.npmjs.com/package/readline-sync)
  used to read user input
- [press-any-key](https://www.npmjs.com/package/press-any-key)
  used at the start of the application to wait for the user to press any key before starting the game.

## Installation

Download the repository to your computer, and run the following command in its directory to install dependencies:

```
npm install
```

## How to play

To play the game, run `node .` or `node index.js`
