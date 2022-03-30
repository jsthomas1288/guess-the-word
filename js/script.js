// This is where the player's letter guess goes
const guess = document.querySelector(".guessed-letters");

// This is the guess button
const guessButton = document.querySelector(".guess");

// This is for the text input where the player will guess a letter
const letterInput = document.querySelector(".letter");

// This is the paragraph where the word in progress will appear
const word = document.querySelector(".word-in-progress");

// This is the paragraph where the remaining guesses will display
const remaining = document.querySelector(".remaining");

// This is the span inside the paragraph where the remaining guesses will display
const span = document.querySelector("span");

// This is the paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

// This is the hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// This is for the starting word
const firstWord = "magnolia";

// This is to change the letters of the first word into "●"
const dotSymbol = function (firstWord) {
  const dotLetters = [];
  for (const letters of firstWord) {
    dotLetters.push("●");
    console.log(dotLetters);
    word.innerText = dotLetters.join("");
  }
};

dotSymbol(firstWord);

// This is to log out the letter input into the console
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const letter = letterInput.value;
  console.log(letter);

  if (letter !== "") {
    clearInput();
  }
});

// This is to clear the input box
const clearInput = function () {
  letterInput.value = "";
};
