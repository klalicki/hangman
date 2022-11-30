# hangman

First project for my JavaScript Fundamentals class - a terminal-based word game. This game follows the basic rules of [Hangman](<https://en.wikipedia.org/wiki/Hangman_(game)>).

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

At the start of the game, a random word is selected from the word bank. The player attempts to guess the word, one letter at a time. If the guessed letter is part of the word, the game shows the player where in the word that letter exists. If the guessed letter is not part of the word, the player loses a life. The player starts the game with 6 lives, and the game ends when the player either has guessed all the letters of the word or reached 0 lives.

To exit the game at any point, press `control+C`
